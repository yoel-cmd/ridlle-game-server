import { supabase } from "../DB/supa_DB.js";

//---------------------load all player----------------------------------

export async function loadAllPlayer() {
    const { data, error } = await supabase.from("player").select("*")

    if (error) {
        console.error('error:', error)
    } else {
        return data
    }
}
//------------------check if player exsist-------------------------------

export async function loadPlayerByNmae(name) {
    const { data, error } = await supabase.from("player").select("*").eq("name", name)

    if (error) {
        console.error('error:', error)
    } else {
        return data
    }
}
// //------------------check if record player exsist-------------------------------

// export async function checkRecord(name, record) {
//     const { data, error } = await supabase.from("player").select("record").eq("name", name);
//     if (error) {
//         console.error('error:', error)
//     } else {
//         return data.record === record
//     }
// }
//-------------------add playr to DB---------------------------------------
export async function addPlayer(player) {
    console.log(player)
    const { data, error } = await supabase.from("player").insert(player).select().single();
    if (error) {
        console.error('error:', error)
        throw new Error(error.message);
    } else {
        return data
    }
}

//-------------------update player-----------------------------
export async function updatePlayer(name, property, value) {
    const { data, error } = await supabase.from('player').update({ [property]: value }).eq('name', name)
    if (error) throw new Error(error.message)
    return "update"
}

//--------------------load players by record----------------------------------

export async function loadAllPlayersByRecord() {
    const { data, error } = await supabase
        .from("player")
        .select("*")
        .order("record", { ascending: true }); 
    if (error) {
        console.error("error:", error.message);
        throw error;
    }
    return data;
}




