const { execSync } = require("child_process");

try {
  // For Windows
  if (process.platform === "win32") {
    const result = execSync("netstat -ano | findstr :3000").toString();
    const lines = result.split("\n").filter(Boolean);

    if (lines.length > 0) {
      lines.forEach((line) => {
        const parts = line.trim().split(/\s+/);
        if (parts.length > 4) {
          const pid = parts[4];
          try {
            execSync(`taskkill /F /PID ${pid}`);
          } catch (e) {
            // Failed to kill process
          }
        }
      });
    }
  }
  // For Unix-based systems (Linux, macOS)
  else {
    execSync("lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9");
  }

  // Port 3000 is now free
} catch (e) {
  // If no process is using port 3000, the command will fail, which is fine
}
