import { constants } from "http2";

import { AppRouteHandlerFnContext, getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

import { IntegrationIdentifier } from "@/lib/activeIntegrations";

export function integrationIdentifierFromContext(context: AppRouteHandlerFnContext): IntegrationIdentifier | null {
    const integrationArg = context.params["integration"];
    const integrationIdentifier = (
        typeof integrationArg !== "string" ? integrationArg?.pop() : integrationArg
    ) as IntegrationIdentifier;
    if (!Object.values(IntegrationIdentifier).includes(integrationIdentifier)) {
        return null;
    }
    return integrationIdentifier;
}

export async function tryUseRefreshToken(req: NextRequest): Promise<string | undefined> {
    // If your access token is expired, and you have a refresh token
    // `getAccessToken` will fetch you a new one using the `refresh_token` grant
    const { accessToken } = await getAccessToken(req, new NextResponse());
    return accessToken;
}

export function respondUnauthorized(): Response {
    return Response.json("Not authenticated", { status: constants.HTTP_STATUS_UNAUTHORIZED });
}

export function respondInternalServerError(): Response {
    return Response.json("Request failed", { status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR });
}
export function respondNotFound(): Response {
    return Response.json("Not found", { status: constants.HTTP_STATUS_NOT_FOUND });
}

export function respondNonOkResponse(response: Response): Response {
    return Response.json(response.statusText, { status: response.status });
}

export async function doOperation(operation: () => Promise<Response>): Promise<Response> {
    const response = await operation();

    if (response == null) {
        return respondInternalServerError();
    }
    if (!response.ok) {
        console.error(response);
        return respondNonOkResponse(response);
    }

    return response;
}

export function get(path: string, accessToken: string): Promise<Response> {
    return fetch(path, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function put(path: string, accessToken: string, body: any): Promise<Response> {
    return fetch(path, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body,
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function post(path: string, accessToken: string, body: any): Promise<Response> {
    return fetch(path, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: body,
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function destroy(path: string, accessToken: string, body: any): Promise<Response> {
    return fetch(path, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: body,
    });
}
