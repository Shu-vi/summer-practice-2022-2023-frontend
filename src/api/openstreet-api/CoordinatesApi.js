import axios from "axios";

export const geocodeLocation = async (location) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    const {data} = await axios.get(url);
    return data;
}