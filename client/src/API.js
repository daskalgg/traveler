const API_URL = 'http://localhost:1337';

export async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export async function createLogEntry(entry) {
    const apikey = entry.apikey;
    delete entry.apikey;
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': apikey,
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}