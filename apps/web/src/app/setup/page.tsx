import { SetupWizard } from "./_components/SetupWizard";
import { LogoIcon } from "../../components/logo";
import { VercelFull } from "../../components/ui/svgs/vercel";
import { Slack } from "../../components/ui/svgs/slack";
import { Beacon } from "../../components/ui/svgs/beacon";
import { Hulu } from "../../components/ui/svgs/hulu";
import { Stripe } from "../../components/ui/svgs/stripe";
import { Spotify } from "../../components/ui/svgs/spotify";
import Image from "next/image";
import Link from "next/link";

export default function SetupPage() {
    return (
        <main className="bg-background light">
            <div className="grid min-h-dvh lg:grid-cols-3">
                <div className="h-full py-6 pl-6 max-lg:hidden">
                    <div className="not-dark:bg-foreground/2 inset-ring inset-ring-border relative grid h-full grid-rows-[1fr_auto] gap-32 rounded-2xl p-12">
                        <div className="mx-auto flex max-w-xs flex-col justify-center">
                            <div className="space-y-6">
                                <p className="text-foreground text-balance text-center text-lg">Looks really good. Did you design in code or Figma first?</p>

                                <div className="space-y-3">
                                    <div className="before:border-foreground/25 relative mx-auto size-8 overflow-hidden rounded-full before:absolute before:inset-0 before:rounded-full before:border">
                                        <Image
                                            src="https://avatars.githubusercontent.com/u/124599?v=4"
                                            alt="Shadcn Avatar"
                                            width={56}
                                            height={56}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-foreground text-balance text-center text-sm">Shadcn</p>
                                        <p className="text-foreground/65 text-balance text-center text-xs">Creator or Shadcn/UI</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="**:fill-foreground/75 mx-auto mt-4 flex max-w-xs flex-wrap justify-center gap-x-12 gap-y-10 pb-4 *:w-fit">
                            <Hulu height={16} width="auto" />
                            <Spotify height={22} width="auto" />
                            <Stripe height={20} width="auto" />
                            <Beacon height={16} width="auto" />
                            <VercelFull height={16} width="auto" />
                        </div>

                        <div className="mask-radial-from-35% mask-radial-[100%_100%] mask-radial-at-bottom max-h-120 absolute inset-0 mt-auto h-fit rounded-2xl opacity-20 dark:opacity-35">
                            <Image
                                src="https://images.unsplash.com/photo-1601774413782-7864d677650e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="background"
                                width={640}
                                height={426}
                                className="size-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-6 lg:col-span-2 relative overflow-y-auto w-full">
                    <SetupWizard />
                </div>
            </div>
        </main>
    );
}
