import { supabase } from "../DB/supa_DB.js";

export async function loadRecord() {
    const { data, error } = await supabase.from("player").select("*")

    if (error) {
        console.error('error:', error)
    } else {
        console.log('data:', data)
    }
}

export async function addPlayer(player) {
    const { data, error } = await supabase.from("player").insert(player);
    if (error) {
        console.error('error:', error)
    } else {
        return data
    }
}


export async function updatePlayer(name, property, value) {
    const { data, error } = await supabase.from('player').update({ [property]: value }).eq('name', name)
    if (error) throw new Error(error.message)
    return "update"

}






