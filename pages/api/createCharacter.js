import { exec } from 'child_process';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract full traits from the request body
    const { traits } = req.body;

    if (!traits || traits.length === 0) {
      return res.status(400).json({ error: 'Traits are required' });
    }

    // Extract model names from traits
    const modelNames = traits.map(trait => trait.model_name).join(' '); // Assuming model_name is a string

    // Define paths and command
    const blenderPath = "C:\\Program Files\\Blender Foundation\\Blender 3.5\\blender.exe";
    const scriptPath = "C:\\Scripts\\Blender\\processAvatar\\processMiilady.py";
    const blendFilePath = "L:\\Projects\\Miilady\\Site\\git\\miilady\\public\\3D\\Blender\\Miilady_v1.blend";

    const blenderCmd = `"${blenderPath}" -b -noaudio -P "${scriptPath}" -- "${blendFilePath}" ${modelNames}`;

    // Execute the Blender command
    exec(blenderCmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).json({ error: 'Blender execution failed' });
        return;
      }

      // Check for successful execution and respond accordingly
      if (stdout.includes("BLENDER_SCRIPT_SUCCESS")) {
        res.status(200).json({ message: `Blender processing completed successfully!` });
      } else if (stdout.includes("BLENDER_SCRIPT_ERROR")) {
        const errorMsg = stdout.split("BLENDER_SCRIPT_ERROR: ")[1];
        res.status(500).json({ error: errorMsg ? errorMsg.trim() : 'Blender script error' });
      } else {
        res.status(500).json({ error: 'Unknown error in Blender processing' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
