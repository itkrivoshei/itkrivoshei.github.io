import { spawn } from "node:child_process";
import { createServer } from "node:net";

export const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
export const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

export const findOpenPort = (host = "127.0.0.1") =>
  new Promise((resolve, reject) => {
    const server = createServer();

    server.once("error", reject);
    server.listen(0, host, () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Could not allocate a local test port."));
        return;
      }

      server.close(() => resolve(address.port));
    });
  });

export const run = (command, args, options = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      ...options,
    });

    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with ${signal ?? `code ${code}`}.`));
    });
  });

export const startProcess = (command, args, options = {}) =>
  spawn(command, args, {
    detached: process.platform !== "win32",
    stdio: "inherit",
    ...options,
  });

export const stopProcess = async (child) => {
  if (!child.pid || child.exitCode !== null) return;

  const killProcess = (signal) => {
    try {
      if (process.platform === "win32") {
        child.kill(signal);
      } else {
        process.kill(-child.pid, signal);
      }
    } catch {
      child.kill(signal);
    }
  };

  killProcess("SIGTERM");
  const exited = await Promise.race([
    new Promise((resolve) => child.once("exit", () => resolve(true))),
    new Promise((resolve) => setTimeout(() => resolve(false), 2_000)),
  ]);

  if (exited || child.exitCode !== null) return;

  killProcess("SIGKILL");
  await Promise.race([
    new Promise((resolve) => {
      if (child.exitCode !== null) {
        resolve();
        return;
      }

      child.once("exit", resolve);
    }),
    new Promise((resolve) => setTimeout(resolve, 1_000)),
  ]);
};

export const waitForUrl = async (url, timeoutMs = 20_000) => {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);

      if (response.ok) return response;
    } catch {
      // The server can refuse connections briefly while it starts.
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error(`Timed out waiting for ${url}.`);
};
