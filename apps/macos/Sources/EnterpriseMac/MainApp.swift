import SwiftUI
import RustBridge

@main
struct EnterpriseMacApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView(coreStatus: RustCore.health())
        }
    }
}
