import SwiftUI

struct ContentView: View {
    let coreStatus: String

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Enterprise macOS app ready")
                .font(.largeTitle)
                .fontWeight(.semibold)
            Text("SwiftUI shell with Rust core boundary scaffolded.")
                .foregroundStyle(.secondary)
            Text(coreStatus)
                .font(.caption)
                .padding(8)
        }
        .padding(32)
        .frame(minWidth: 520, minHeight: 320)
    }
}
