import Link from "next/link";

import {

    PlugZap,

} from "lucide-react";

interface ConnectIntegrationProps {

    title?: string;

    description?: string;

    plugin?:

    "gmail"

    |

    "googlecalendar";

}

export default function ConnectIntegration({

    title = "No Integration Connected",

    description = "Connect Gmail or Google Calendar to start using ConvertIQ.",

    plugin,

}: ConnectIntegrationProps) {

    return (

        <div className="h-full flex items-center justify-center p-8">

            <div className="max-w-md text-center">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">

                    <PlugZap size={30} />

                </div>

                <h1 className="mt-6 text-3xl font-bold text-[var(--text-primary)]">

                    {title}

                </h1>

                <p className="mt-3 text-[var(--text-secondary)]">

                    {description}

                </p>

                <Link

                    href={

                        plugin

                            ? `/api/integrations/connect?plugin=${plugin}`

                            : "/dashboard/integrations"

                    }

                    className="inline-flex items-center mt-8 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:opacity-90 transition"

                >

                    {

                        plugin ===

                            "gmail"

                            ? "Connect Gmail"

                            : plugin ===

                                "googlecalendar"

                                ? "Connect Google Calendar"

                                : "Connect Integrations"

                    }

                </Link>

            </div>

        </div>

    );

}