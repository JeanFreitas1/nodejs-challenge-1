export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-z]+)/g;
    const pathWithParams = path.replaceAll(
        routeParametersRegex,
        "(?<$1>[a-z0-9-_]+)"
    );

    // return new RegExp()
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

    return pathRegex;
}
