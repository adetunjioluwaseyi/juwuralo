import { BadgeCheck, Truck, ClipboardList, HeadphonesIcon } from 'lucide-react'

const FEATURES = [
  { icon: BadgeCheck, top: 'AUTHENTIC', bottom: 'QUALITY' },
  { icon: Truck, top: 'UK WIDE', bottom: 'DELIVERY' },
  { icon: ClipboardList, top: 'EASY', bottom: 'RENTAL PROCESS' },
  { icon: HeadphonesIcon, top: 'EXCEPTIONAL', bottom: 'SERVICE' },
]

export function FeatureStrip() {
  return (
    <section aria-label="Why rent with us" className="bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-10">
        {FEATURES.map(({ icon: Icon, top, bottom }) => (
          <div key={bottom} className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#c8a24a]/60 text-[#c8a24a]">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <p className="text-[11px] leading-snug tracking-[0.12em] text-[#1a1035]/70">
              {top}
              <br />
              <span className="font-semibold text-[#1a1035]">{bottom}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
