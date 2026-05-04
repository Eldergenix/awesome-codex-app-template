import { Composition, registerRoot } from "remotion";
import { PromoVideo, WalkthroughVideo } from "./promo/PromoVideo";
import "../src/app/globals.css";

export const RemotionRoot: React.FC = () => {
  const fps = 60;
  const durationInFrames = fps * 37;
  const width = 1080;
  const height = 700;

  return (
    <>
      <Composition
        id="XPromoLaunch"
        component={PromoVideo}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{ variant: "launch" }}
      />
      <Composition
        id="XPromoWorkflow"
        component={PromoVideo}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{ variant: "workflow" }}
      />
      <Composition
        id="XPromoFree"
        component={PromoVideo}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{ variant: "free" }}
      />
      <Composition
        id="XWalkthrough"
        component={WalkthroughVideo}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
      />
    </>
  );
};

registerRoot(RemotionRoot);
