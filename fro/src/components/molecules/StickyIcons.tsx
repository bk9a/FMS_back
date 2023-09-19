import { FacebookLogo, InstagramLogo, TwitterLogo, YoutubeLogo } from "@phosphor-icons/react";

const StickyIcons = () => {
    return (
        <aside className="fixed lg:bottom-0 bottom-1/2 left-0  flex flex-col gap-5 items-center bg-gradient-to-t z-40 from-bodyhack to-bodyhack rounded-e-lg py-3 px-2 ">
            <a href="https://www.facebook.com/profile.php?id=100010195770621&mibextid=LQQJ4d" className="text-zinc-100 hover:text-zinc-900">
                <FacebookLogo size={15} color="currentColor" weight="fill" />
            </a>
            <a href="https://youtube.com/@trainerdorjkhuu2749?si=akP1gk14mBSR_gem" className="text-zinc-100 hover:text-zinc-900">
                <YoutubeLogo size={15} color="currentColor" weight="fill" />
            </a>
            <a href="https://instagram.com/trainer.dorjkhuu?igshid=MWZjMTM2ODFkZg==" className="text-zinc-100 hover:text-zinc-900">
                <InstagramLogo size={15} color="currentColor" weight="fill" />
            </a>
            <a href="/" className="text-zinc-100 hover:text-zinc-900">
                <TwitterLogo size={15} color="currentColor" weight="fill" />
            </a>
        </aside>
    )
}

export default StickyIcons