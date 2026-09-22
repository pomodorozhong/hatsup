# iOS 3D learning path for Hats Up

The goal is to keep the SwiftUI app layout while showing each hat as a low-poly 3D model. As an optional feature, a user can select or take a photo and display a low-resolution version of their face on a stylized head.

Recommended starting stack: **SwiftUI + RealityKit `RealityView` + Blender-authored USDZ assets**. Use Reality Composer Pro when a designer needs to compose animation sequences. Add ARKit only if the product later needs live face or hat tracking.

## Essential learning path

1. **Understand how RealityKit fits into SwiftUI.** Watch Apple's [Discover RealityKit APIs for iOS, macOS, and visionOS](https://developer.apple.com/videos/play/wwdc2024/10103/), then read the [`RealityView` overview](https://developer.apple.com/documentation/realitykit/realityview). Focus on entities, components, the virtual camera, asynchronous loading, and updates from SwiftUI state. `RealityView` is the likely home for the interactive hat; [`Model3D`](https://developer.apple.com/documentation/realitykit/model3d/) is a simpler starting point for displaying a model.

2. **Display and manipulate one hat.** Read Apple's [Loading entities from a file](https://developer.apple.com/documentation/realitykit/loading-entities-from-a-file) and the [`RealityView` documentation](https://developer.apple.com/documentation/realitykit/realityview). Load one USDZ hat, center and light it, allow rotation, and add a small idle animation. This establishes the app's rendering and interaction pattern before building all six hats.

3. **Establish the designer-to-Xcode asset handoff.** Study [Creating USD files for Apple devices](https://developer.apple.com/documentation/usd/creating-usd-files-for-apple-devices). Agree on units, model origin and pivot, stable entity and material names, UV mapping, texture sizes, and animation clip names. Run `usdchecker` and inspect the exported model in the target renderer, since a structurally valid file can still look or behave incorrectly.

4. **Learn animation in increasing complexity.** Start with [RealityKit entity animations](https://developer.apple.com/documentation/realitykit/game-development-entity-animations) for floating, spinning, scaling, or switching hats. Then watch [Compose interactive 3D content in Reality Composer Pro](https://developer.apple.com/videos/play/wwdc2024/10102/) for timelines, skeletal poses, and blend shapes. Imported clips appear through [`availableAnimations`](https://developer.apple.com/documentation/realitykit/entity/availableanimations). Use skeletal animation only for deforming characters, and blend shapes only if the face needs expressions.

5. **Prototype the optional photo texture.** Learn [`PhotosPicker`](https://developer.apple.com/documentation/photosui/photospicker), [Vision face landmarks](https://developer.apple.com/documentation/vision/vndetectfacelandmarksrequest), [Core Image pixelation](https://developer.apple.com/documentation/coreimage/cipixellate), and [RealityKit textured materials](https://developer.apple.com/documentation/realitykit/applying-realistic-material-and-lighting-effects-to-entities). Start with one fixed, UV-mapped low-poly head: detect and align the face, crop and downsample it, generate a [`TextureResource`](https://developer.apple.com/documentation/realitykit/textureresource/generateasync%28from%3Awithname%3Aoptions%3A%29), and apply it to the front facial region. Design the sides and back with flat colors or a matching stylized texture, since one photo cannot show those surfaces.

6. **Optimize on a real iPhone.** Watch [Optimize your 3D assets for spatial computing](https://developer.apple.com/videos/play/wwdc2024/10186/) and read [Reducing GPU utilization in a RealityKit app](https://developer.apple.com/documentation/realitykit/reducing-gpu-utilization-in-your-realitykit-app). Check texture memory, material and mesh count, shadows, transparency, and skeletal joint count on the oldest device the app will support.

## Engine choice

| Option | Fit for Hats Up | Main tradeoff |
| --- | --- | --- |
| [RealityKit](https://developer.apple.com/documentation/realitykit) | Best fit for an iOS app with SwiftUI screens and interactive 3D hats. | Apple platform focus and less game-editor tooling. |
| [Unity](https://docs.unity3d.com/Manual/UnityasaLibrary-iOS.html) | Consider if the product becomes 3D-first and cross-platform. | Embedding Unity in a native iOS app adds integration costs; Unity as a Library supports full-screen rendering only. |
| [Unreal Engine](https://dev.epicgames.com/documentation/unreal-engine/ios-ipados-tvos-quick-start-guide-for-unreal-engine) | Suited to a much larger, game-like experience. | Heavy tooling and build footprint for this app. |
| [MetalKit](https://developer.apple.com/documentation/metalkit/mtkview) | Useful later for a specific rendering effect or bottleneck. | Requires substantial custom rendering infrastructure. |
| [SceneKit](https://developer.apple.com/documentation/scenekit/) | Existing projects may still use it. | Apple marks it deprecated and recommends RealityKit for new work. |

Assuming an iOS 18-or-newer deployment target, use `RealityView` for the interactive hat. For an older target, [`ARView`](https://developer.apple.com/documentation/realitykit/arview) can be wrapped in SwiftUI through [`UIViewRepresentable`](https://developer.apple.com/documentation/swiftui/uiviewrepresentable).

## Model formats

| Format | Role in this pipeline |
| --- | --- |
| **USDZ** | Recommended packaged asset for deployment. Bundles geometry, materials, textures, and animation. |
| **USDC** | Compact binary USD format, useful while iterating on geometry-heavy assets. |
| **USDA** | Human-readable USD format, useful for inspecting and debugging scene structure. |
| **`.reality`** | RealityKit scene asset, useful when composition includes Reality Composer Pro behavior and components. |
| **glTF/GLB** | Strong cross-engine and web delivery format with skinning and morph targets; convert or re-export to USD for RealityKit. |
| **FBX** | Common authoring interchange for rigs and animation; not the preferred iOS runtime asset. |
| **OBJ** | Suitable for a basic static mesh, with limited value for an animated pipeline. |

Apple's [USD guide](https://developer.apple.com/documentation/usd/creating-usd-files-for-apple-devices) explains its format recommendations and RealityKit compatibility. For format details, see the [OpenUSD USDZ specification](https://openusd.org/dev/spec_usdz.html) and [Khronos glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html).

Keep the designer's `.blend` file as the editable source. Export USD or USDZ, validate it, inspect it in Preview or Reality Composer Pro, then bundle it in Xcode. Blender's USD exporter can export armatures and shape keys; check the export options and limitations for the designer's exact Blender version. Blender's [4.1 release notes](https://developer.blender.org/docs/release_notes/4.1/pipeline_assets_io/) confirm support for these features.

## Animation and photo decisions

| Desired effect | First technique to try |
| --- | --- |
| Hat floats, spins, bounces, or scales | RealityKit transform animation in Swift. |
| Several hats move through a designed sequence | Reality Composer Pro timeline. |
| A head or character bends | Blender armature and skeletal animation. |
| Face smiles or blinks | Blend shapes, called shape keys in Blender. |
| Live expression drives an avatar | ARKit face data driving compatible blend shapes. |

For the photo feature, process the chosen image on-device and store the processed low-resolution texture unless the user chooses to retain the original. `PhotosPicker` grants access to selected photos only. Taking a new photo is a separate camera-capture step using [AVFoundation](https://developer.apple.com/documentation/avfoundation/avcapturephotooutput).

Live hat placement on a moving real face is a separate feature. Apple's [Tracking and visualizing faces](https://developer.apple.com/documentation/arkit/tracking-and-visualizing-faces) shows what ARKit can provide, including face pose, geometry, and expression data. It is optional for the still-photo design above.
