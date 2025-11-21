import express from "express";
import { exec } from "child_process";
import util from "util";

const router = express.Router();
const execPromise = util.promisify(exec);

// Escape unsafe quotes
function escapeCode(code) {
  return code.replace(/"/g, '\\"');
}

router.post("/run", async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.json({ output: "Invalid request" });
  }

  let command = "";

  // -------------------------------
  // PYTHON (Windows)
  // Use python, NOT python3
  // -------------------------------
  if (language === "python") {
    command = `python -c "${escapeCode(code)}"`;
  }

  // -------------------------------
  // JAVASCRIPT
  // -------------------------------
  else if (language === "javascript") {
    command = `node -e "${escapeCode(code)}"`;
  }

  else {
    return res.json({ output: "Language not supported" });
  }

  try {
    console.log("Running command:", command);

    const { stdout, stderr } = await execPromise(command);

    console.log("STDOUT:", stdout);
    console.log("STDERR:", stderr);

    if (stderr) {
      return res.json({ output: stderr });
    }

    return res.json({ output: stdout || "No Output" });

  } catch (err) {
    console.log("ERROR:", err);
    return res.json({ output: "Runtime Error" });
  }
});

export default router;
