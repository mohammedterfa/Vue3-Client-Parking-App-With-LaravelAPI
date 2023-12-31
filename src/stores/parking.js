import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useParking = defineStore("parking", () => {
    const router = useRouter();
    const errors = reactive({});
    const loading = ref(false);
    const form = reactive({
        vehicle_id: null,
        zone_id: null,
    });

    function resetForm(){
        form.vehicle_id = null;
        form.zone_id = null;

        errors.value = {};
    }

    function startParking(){
        if(loading.value) return;

        loading.value = true;
        errors.value = {};

        return window.axios
            .post("parking/start", form)
            .then(() => {
                router.push({ name: "parking.active" });
            })
            .catch((error) => {
                if(error.response.status === 422){
                    errors.value = error.response.data.errrors;
                }
            })
            .finally(() => (loading.value = false));
    }

    const parkings = ref([]);
 
function getActiveParkings() {
  return window.axios.get("parkings").then((response) => {
    parkings.value = response.data.data;
  });
}
 
function stopParking(parking) {
  window.axios.put(`parkings/${parking.id}`).then(getActiveParkings);
}

    return { form, errors, loading, resetForm, startParking, parkings, getActiveParkings,stopParking, }
});