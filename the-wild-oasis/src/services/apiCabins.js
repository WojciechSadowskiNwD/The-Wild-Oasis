import supabase from "./supabase";

export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be deleted");
	}
	return data;
}

export async function createEditCabin(newCabin, id) {
	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const hasImagePath = newCabin.image?.startsWith?(supabase);
	// console.log("hasImagePath: ");
	// console.log(hasImagePath);
	
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		"",
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create/edit cabin
	let query = supabase.from("cabins");

	// CREATE
	if (!id) query.insert([{ ...newCabin, image: imagePath }]);

	// EDIT
	if (id) query.update({ ...newCabin, image: imagePath }).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.log(error);
		throw new Error("Cabin could not be created");
	}

	// 2. Upload image
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// 3. Delete the cabin IF there was an error uploading image
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.log(storageError);
		throw new Error(
			"Cabin image could not be uploaded and the cabin was not created.",
		);
	}

	return data;
}
