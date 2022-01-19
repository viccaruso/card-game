const SUPABASE_URL = 'https://yrwbazntrofswpdeqhcy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMTgxMjczLCJleHAiOjE5NTc3NTcyNzN9.namMk71vQ_3X5tYNnTcj3T0o26D_WdG-KVFX6JLYlCE';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


export async function createPlayerProfile(player) {
    const response = await client
        .from('player_profile')
        .insert([{
            player_name: player.player_name,
            wins: player.wins,
            losses: player.losses,
            total_games: player.total_games
        }]);
    console.log('createPlayerProfile(player) returned: ', response);
    return checkError(response);
}

export async function getPlayerProfile(id) {
    const response = await client
        .from('player_profile')
        .select()
        .match({ user_id: id })
        .single();
    console.log('getPlayerProfile(id) returned: ', response);
    return checkError(response);
}

export async function getLeaderboard() {
    const response = await client
        .from('leaderboard')
        .select(`*, player_profile (*)`);
    console.log('getLeaderboard returned: ', response);
    return checkError(response);
}





export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./game');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
