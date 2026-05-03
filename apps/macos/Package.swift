// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "EnterpriseMac",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "EnterpriseMac", targets: ["EnterpriseMac"])
    ],
    targets: [
        .executableTarget(name: "EnterpriseMac", dependencies: ["RustBridge"]),
        .target(name: "RustBridge")
    ]
)
