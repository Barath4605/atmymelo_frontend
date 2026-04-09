export function isLoggedIn() {
    return !!localStorage.getItem("token");
}

export function getUsername() {
    return localStorage.getItem("username");
}

export function getName() {
    return localStorage.getItem("name");
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    window.location.reload();
}