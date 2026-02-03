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

export async function createCabin(newCabin) {
	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		"",
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create cabin
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }]);

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
