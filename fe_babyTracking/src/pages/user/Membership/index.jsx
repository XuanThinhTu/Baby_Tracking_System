import { CheckIcon } from "@heroicons/react/outline";

const tiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "#",
    priceMonthly: "$29",
    description:
      "The perfect plan if you're just getting started with our product.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
    ],
    featured: false,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$99",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "Dedicated support representative",
      "Marketing automations",
      "Custom integrations",
    ],
    featured: true,
  },
];

export default function MembershipPage() {
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-tr from-pink-50 via-pink-100 to-pink-200 px-6 py-24 sm:py-32 lg:px-8">
      {/* Decor Shape (optional) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        {/* Gradient shape with pastel pinks */}
        <div
          className="mx-auto aspect-square w-[80rem] rounded-full bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400 opacity-40"
          style={{
            clipPath:
              "polygon(70% 0%, 100% 35%, 100% 100%, 30% 100%, 0% 65%, 0% 0%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-pink-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-700 sm:text-xl">
        Choose an affordable plan that’s packed with the best features for
        engaging your audience, creating customer loyalty, and driving sales.
      </p>

      {/* 2 cột, gap-8, items-stretch => cùng chiều cao */}
      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 items-stretch sm:mt-20 lg:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={
              tier.featured
                ? // Gói featured: gradient hồng đậm + chữ trắng
                  "flex flex-col justify-between rounded-3xl p-8 sm:p-10 shadow-2xl bg-gradient-to-r from-pink-400 via-pink-500 to-pink-300 text-white"
                : // Gói thường: nền trắng mờ
                  "flex flex-col justify-between rounded-3xl p-8 sm:p-10 bg-white/70 backdrop-blur-md shadow ring-1 ring-gray-900/10"
            }
          >
            {/* Title */}
            <h3
              id={tier.id}
              className={
                tier.featured
                  ? "text-pink-100 text-base font-semibold"
                  : "text-pink-600 text-base font-semibold"
              }
            >
              {tier.name}
            </h3>

            {/* Price */}
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={
                  tier.featured
                    ? "text-5xl font-semibold tracking-tight text-white"
                    : "text-5xl font-semibold tracking-tight text-gray-900"
                }
              >
                {tier.priceMonthly}
              </span>
              <span
                className={
                  tier.featured
                    ? "text-pink-100 text-base"
                    : "text-gray-500 text-base"
                }
              >
                /month
              </span>
            </p>

            {/* Description */}
            <p
              className={
                tier.featured
                  ? "mt-6 text-base text-pink-100"
                  : "mt-6 text-base text-gray-600"
              }
            >
              {tier.description}
            </p>

            {/* Feature list */}
            <ul
              role="list"
              className={
                tier.featured
                  ? "mt-8 space-y-3 text-sm text-pink-100 sm:mt-10"
                  : "mt-8 space-y-3 text-sm text-gray-600 sm:mt-10"
              }
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={
                      tier.featured
                        ? "h-6 w-5 flex-none text-pink-100"
                        : "h-6 w-5 flex-none text-pink-600"
                    }
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={
                tier.featured
                  ? // Gói featured: Nút trắng chữ hồng
                    "mt-8 block w-full rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-pink-700 shadow-md hover:bg-pink-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 sm:mt-10"
                  : // Gói thường: Nút hồng đậm chữ trắng
                    "mt-8 block w-full rounded-md bg-pink-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 sm:mt-10"
              }
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
