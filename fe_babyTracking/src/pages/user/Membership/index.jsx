import { CheckIcon } from '@heroicons/react/outline'

const tiers = [
    {
        name: 'Hobby',
        id: 'tier-hobby',
        href: '#',
        priceMonthly: '$29',
        description: "The perfect plan if you're just getting started with our product.",
        features: [
            '25 products',
            'Up to 10,000 subscribers',
            'Advanced analytics',
            '24-hour support response time',
        ],
        featured: false,
    },
    {
        name: 'Enterprise',
        id: 'tier-enterprise',
        href: '#',
        priceMonthly: '$99',
        description: 'Dedicated support and infrastructure for your company.',
        features: [
            'Unlimited products',
            'Unlimited subscribers',
            'Advanced analytics',
            'Dedicated support representative',
            'Marketing automations',
            'Custom integrations',
        ],
        featured: true,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MembershipPage() {
    return (
        <div className="relative isolate min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-purple-50 px-6 py-24 sm:py-32 lg:px-8">
            {/* Decor Shape (optional) */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
            >
                {/* Thêm 1 div gradient shape */}
                <div
                    className="mx-auto aspect-square w-[80rem] rounded-full bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 opacity-40"
                    style={{
                        clipPath: 'polygon(70% 0%, 100% 35%, 100% 100%, 30% 100%, 0% 65%, 0% 0%)',
                    }}
                />
            </div>

            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
                <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                    Choose the right plan for you
                </p>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-700 sm:text-xl">
                Choose an affordable plan that’s packed with the best features for engaging your
                audience, creating customer loyalty, and driving sales.
            </p>

            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                {tiers.map((tier, tierIdx) => (
                    <div
                        key={tier.id}
                        className={classNames(
                            tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/70 sm:mx-8 lg:mx-0',
                            tier.featured
                                ? ''
                                : tierIdx === 0
                                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                                    : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
                            'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 backdrop-blur-sm'
                        )}
                    >
                        <h3
                            id={tier.id}
                            className={classNames(
                                tier.featured ? 'text-indigo-300' : 'text-indigo-600',
                                'text-base font-semibold'
                            )}
                        >
                            {tier.name}
                        </h3>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span
                                className={classNames(
                                    tier.featured ? 'text-white' : 'text-gray-900',
                                    'text-5xl font-semibold tracking-tight'
                                )}
                            >
                                {tier.priceMonthly}
                            </span>
                            <span
                                className={classNames(
                                    tier.featured ? 'text-gray-400' : 'text-gray-500',
                                    'text-base'
                                )}
                            >
                                /month
                            </span>
                        </p>
                        <p
                            className={classNames(
                                tier.featured ? 'text-gray-300' : 'text-gray-600',
                                'mt-6 text-base'
                            )}
                        >
                            {tier.description}
                        </p>
                        <ul
                            role="list"
                            className={classNames(
                                tier.featured ? 'text-gray-300' : 'text-gray-600',
                                'mt-8 space-y-3 text-sm sm:mt-10'
                            )}
                        >
                            {tier.features.map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <CheckIcon
                                        aria-hidden="true"
                                        className={classNames(
                                            tier.featured ? 'text-indigo-300' : 'text-indigo-600',
                                            'h-6 w-5 flex-none'
                                        )}
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <a
                            href={tier.href}
                            aria-describedby={tier.id}
                            className={classNames(
                                tier.featured
                                    ? 'bg-indigo-500 text-white shadow-md hover:bg-indigo-400 focus-visible:outline-indigo-500'
                                    : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600',
                                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
                            )}
                        >
                            Get started today
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
