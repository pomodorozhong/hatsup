# Three-phase plan for 3D hats on iOS

| Phase | Designer | iOS developer |
| --- | --- | --- |
| **1. Prove one hat** | Model one hat in Blender, agree on scale and pivot, and export a USDZ. Review it in the actual layout. | Load it into `RealityView` in the SwiftUI screen. Add a simple **RealityKit** float or spin and test on an iPhone. |
| **2. Complete the hats** | Produce the other five hats to the same asset rules. Author Blender animation only for motion that needs to change the model itself. | Add hat switching, consistent motion, lighting, and transitions. Test all six for visual consistency and performance. |
| **3. Add the optional photo face** | Build and UV-map the low-poly head. Define the photo area and the appearance of its sides and back. | Add photo capture or selection, guided crop, low-resolution texture, and preview. Consider Vision alignment only if manual placement is difficult. |
