import DefaultLayout from "@/layouts/DefaultLayout"
import Home from "@/pages/Home"
import PageNotFound from "@/pages/PageNotFound"
export const routes = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]