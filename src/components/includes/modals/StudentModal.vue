<template>
    <div class="modal fade" id="STUDENT-MODAL" data-backdrop="static" data-keyboard="false" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <form @submit.prevent="saveStudent()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Student Management</h5>
                        <button type="button" class="close" @click="hideModal">
                            <span>×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-lg-3">
                                        <CropperModal v-model="studentObj.photo" v-model:current="currentImage"
                                            v-model:error="studentErrObj.photo" :width="454" :height="454" />
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="row">
                                            <div class="form-group col-lg-6">
                                                <label>Name (Khmer)</label>
                                                <input v-model="studentObj.name_kh" type="text" class="form-control"
                                                    :class="{ 'is-invalid': !!studentErrObj.name_kh }">
                                                <div class="invalid-feedback">
                                                    {{ studentErrObj.name_kh }}
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label>Name (Latin)</label>
                                                <input v-model="studentObj.name_en" type="text" class="form-control"
                                                    :class="{ 'is-invalid': !!studentErrObj.name_en }">
                                                <div class="invalid-feedback">
                                                    {{ studentErrObj.name_en }}
                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="form-group col-lg-4">
                                                <label>Gender</label>
                                                <select v-model="studentObj.gender_id" class="form-control"
                                                    :class="{ 'is-invalid': !!studentErrObj.gender_id }">
                                                    <option v-for="{ id, gd_kh_full } in genders" :key="id" :value="id">
                                                        {{ gd_kh_full }}
                                                    </option>
                                                </select>
                                                <div class="invalid-feedback">
                                                    {{ studentErrObj.gender_id }}
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label>Date of Birth</label>
                                                <VueDatePicker v-model="studentObj.dob"
                                                    :formats="{ input: 'dd-MM-yyyy' }" model-type="dd-MM-yyyy"
                                                    :time-config="{ enableTimePicker: false }"
                                                    :class="{ 'is-invalid': !!studentErrObj.dob }" />
                                                <div class="invalid-feedback">
                                                    {{ studentErrObj.dob }}
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label>Phone Number</label>
                                                <div class="input-group">
                                                    <input v-model="studentObj.phone" type="text" class="form-control"
                                                        :class="{ 'is-invalid': !!studentErrObj.phone }">
                                                    <div class="input-group-append">
                                                        <div class="input-group-text">
                                                            <span class="fas fa-phone"></span>
                                                        </div>
                                                    </div>
                                                    <div class="invalid-feedback">
                                                        {{ studentErrObj.phone }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-lg-4">
                                                <label>Ethnicity</label>
                                                <select v-model="studentObj.ethnicity_id" class="form-control"
                                                    :class="{ 'is-invalid': !!studentErrObj.ethnicity_id }">
                                                    <option v-for="{ id, eth_kh } in ethnicities" :key="id" :value="id">
                                                        {{ eth_kh }}
                                                    </option>
                                                </select>
                                                <div class="invalid-feedback">
                                                    {{ studentErrObj.ethnicity_id }}
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label>Nationality</label>
                                                <select v-model="studentObj.nationality_id" class="form-control"
                                                    :class="{ 'is-invalid': !!studentErrObj.nationality_id }">
                                                    <option v-for="{ id, nat_kh } in nationalities" :key="id"
                                                        :value="id">
                                                        {{ nat_kh }}
                                                    </option>
                                                </select>
                                                <div class="invalid-feedback">
                                                    {{ studentErrObj.nationality_id }}
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label>Religion</label>
                                                <select v-model="studentObj.religion_id" class="form-control"
                                                    :class="{ 'is-invalid': !!studentErrObj.religion_id }">
                                                    <option v-for="{ id, rel_kh } in religions" :key="id" :value="id">
                                                        {{ rel_kh }}
                                                    </option>
                                                </select>
                                                <div class="invalid-feedback">
                                                    {{ studentErrObj.religion_id }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <h6 class="font-weight-bold mt-2">Place of Birth (POB)</h6>
                                <div class="row">
                                    <div class="form-group col-lg-3">
                                        <label>Province / Capital</label>
                                        <VueMultiSelect v-model="selectedPobProvince" :options="provinces" track-by="id"
                                            label="name_kh" placeholder="---none---"
                                            :class="{ 'is-invalid': !!studentErrObj.pob_province_id }" />
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.pob_province_id }}
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label>District / Municipality / City</label>
                                        <VueMultiSelect v-model="selectedPobDistrict" :options="pobDistricts"
                                            track-by="id" label="name_kh" placeholder="---none---"
                                            :class="{ 'is-invalid': !!studentErrObj.pob_district_id }"
                                            :disabled="!studentObj.pob_province_id" />
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.pob_district_id }}
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label>Commune / Sangkat</label>
                                        <VueMultiSelect v-model="selectedPobCommune" :options="pobCommunes"
                                            track-by="id" label="name_kh" placeholder="---none---"
                                            :class="{ 'is-invalid': !!studentErrObj.pob_commune_id }"
                                            :disabled="!studentObj.pob_district_id" />
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.pob_commune_id }}
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label>Village</label>
                                        <VueMultiSelect v-model="selectedPobVillage" :options="pobVillages"
                                            track-by="id" label="name_kh" placeholder="---none---"
                                            :class="{ 'is-invalid': !!studentErrObj.pob_village_id }"
                                            :disabled="!studentObj.pob_commune_id" />
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.pob_village_id }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <h6 class="font-weight-bold mt-2">Current Address (POR)</h6>
                                <div class="row">
                                    <div class="form-group col-lg-3">
                                        <label>Province / Capital</label>
                                        <VueMultiSelect v-model="selectedPorProvince" :options="provinces" track-by="id"
                                            label="name_kh" placeholder="---none---"
                                            :class="{ 'is-invalid': !!studentErrObj.por_province_id }" />
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.por_province_id }}
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label>District / Municipality / City</label>
                                        <VueMultiSelect v-model="selectedPorDistrict" :options="porDistricts"
                                            track-by="id" label="name_kh" placeholder="---none---"
                                            :class="{ 'is-invalid': !!studentErrObj.por_district_id }"
                                            :disabled="!studentObj.por_province_id" />
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.por_district_id }}
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label>Commune / Sangkat</label>
                                        <VueMultiSelect v-model="selectedPorCommune" :options="porCommunes"
                                            track-by="id" label="name_kh" placeholder="---none---"
                                            :class="{ 'is-invalid': !!studentErrObj.por_commune_id }" />
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.por_commune_id }}
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label>Village</label>
                                        <VueMultiSelect v-model="selectedPorVillage" :options="porVillages"
                                            track-by="id" label="name_kh" placeholder="---none---"
                                            :class="{ 'is-invalid': !!studentErrObj.por_village_id }" />
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.por_village_id }}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-lg-6">
                                        <label>House Number</label>
                                        <input v-model="studentObj.home_no" type="text" class="form-control"
                                            :class="{ 'is-invalid': !!studentErrObj.home_no }">
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.home_no }}
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label>Street Number</label>
                                        <input v-model="studentObj.street_no" type="text" class="form-control"
                                            :class="{ 'is-invalid': !!studentErrObj.street_no }">
                                        <div class="invalid-feedback">
                                            {{ studentErrObj.street_no }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-secondary" @click="hideModal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import $ from 'jquery';
import Swal from 'sweetalert2';
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { apiCreateStudent, apiReadStudent, apiUpdateStudent, apiDeleteStudent } from '@/functions/api/student';
import { CloseModal, LoadingModal, MessageModal } from "@/functions/swal";
import { apiGetAllGenders, apiGetAllNationalities, apiGetAllEthnicities, apiGetAllReligions } from '@/functions/api/asset';
import { apiGetProvinces, apiGetDistrictsByProvince, apiGetCommunesByDistrict, apiGetVillagesByCommune } from '@/functions/api/geo';
import CropperModal from '@/components/includes/controls/CropperModal.vue';

const props = defineProps({
    onCreated: {
        type: Function,
    },
    onUpdated: {
        type: Function,
    },
    onDeleted: {
        type: Function,
    },
});

const currentImage = ref(null);

const genders = ref([]);
const nationalities = ref([]);
const ethnicities = ref([]);
const religions = ref([]);

const provinces = ref([]);

const pobDistricts = ref([]);
const pobCommunes = ref([]);
const pobVillages = ref([]);

const porDistricts = ref([]);
const porCommunes = ref([]);
const porVillages = ref([]);

const selectedPobProvince = computed({
    get() {
        return provinces.value.find(p => p.id === studentObj.pob_province_id) || null;
    },
    set(value) {
        studentObj.pob_province_id = value ? value.id : null;
    }
});
const selectedPobDistrict = computed({
    get() {
        return pobDistricts.value.find(d => d.id === studentObj.pob_district_id) || null;
    },
    set(value) {
        studentObj.pob_district_id = value ? value.id : null;
    }
});
const selectedPobCommune = computed({
    get() {
        return pobCommunes.value.find(c => c.id === studentObj.pob_commune_id) || null;
    },
    set(value) {
        studentObj.pob_commune_id = value ? value.id : null;
    }
});
const selectedPobVillage = computed({
    get() {
        return pobVillages.value.find(v => v.id === studentObj.pob_village_id) || null;
    },
    set(value) {
        studentObj.pob_village_id = value ? value.id : null;
    }
});

const selectedPorProvince = computed({
    get() {
        return provinces.value.find(p => p.id === studentObj.por_province_id) || null;
    },
    set(value) {
        studentObj.por_province_id = value ? value.id : null;
    }
});
const selectedPorDistrict = computed({
    get() {
        return porDistricts.value.find(d => d.id === studentObj.por_district_id) || null;
    },
    set(value) {
        studentObj.por_district_id = value ? value.id : null;
    }
});
const selectedPorCommune = computed({
    get() {
        return porCommunes.value.find(c => c.id === studentObj.por_commune_id) || null;
    },
    set(value) {
        studentObj.por_commune_id = value ? value.id : null;
    }
});
const selectedPorVillage = computed({
    get() {
        return porVillages.value.find(v => v.id === studentObj.por_village_id) || null;
    },
    set(value) {
        studentObj.por_village_id = value ? value.id : null;
    }
});

const studentObj = reactive({
    id: null,
    name_en: "",
    name_kh: "",
    dob: "",
    home_no: "",
    street_no: "",
    phone: "",
    photo: "",
    gender_id: 1,
    nationality_id: 1,
    ethnicity_id: 1,
    religion_id: 1,
    pob_province_id: null,
    pob_district_id: null,
    pob_commune_id: null,
    pob_village_id: null,
    por_province_id: null,
    por_district_id: null,
    por_commune_id: null,
    por_village_id: null,
});
const studentErrObj = reactive({
    name_en: "",
    name_kh: "",
    dob: "",
    home_no: "",
    street_no: "",
    phone: "",
    photo: "",
    gender_id: "",
    nationality_id: "",
    ethnicity_id: "",
    religion_id: "",
    pob_province_id: "",
    pob_district_id: "",
    pob_commune_id: "",
    pob_village_id: "",
    por_province_id: "",
    por_district_id: "",
    por_commune_id: "",
    por_village_id: "",
});

const defaultStudentObj = JSON.parse(JSON.stringify(studentObj));
const defaultStudentErrObj = JSON.parse(JSON.stringify(studentErrObj));

function resetAllState() {
    Object.assign(studentObj, defaultStudentObj);
    Object.assign(studentErrObj, defaultStudentErrObj);
}

onMounted(async () => {
    $('#STUDENT-MODAL').on('hide.bs.modal', function () {
        resetAllState();
    });
    try {
        LoadingModal();
        await Promise.all([
            generateGenders(),
            generateNationalities(),
            generateEthnicities(),
            generateReligions(),
            generateProvinces()
        ]);
        return CloseModal();
    } catch (error) {
        return MessageModal({ icon: "error", title: "Error", text: error.response?.data?.message || error.message });
    }
});

watch(() => studentObj.pob_province_id, async (nv, ov) => {
    pobDistricts.value = [];
    if (nv) {
        const response = await generateDistrictsByProvince(nv);
        pobDistricts.value = response.data.districts;
    };
    if (!pobDistricts.value.find(d => d.id === studentObj.pob_district_id)) {
        studentObj.pob_district_id = null;
    }
});
watch(() => studentObj.pob_district_id, async (nv, ov) => {
    pobCommunes.value = [];
    if (nv) {
        const response = await generateCommunesByDistrict(nv);
        pobCommunes.value = response.data.communes;
    };
    if (!pobCommunes.value.find(c => c.id === studentObj.pob_commune_id)) {
        studentObj.pob_commune_id = null;
    }
});
watch(() => studentObj.pob_commune_id, async (nv, ov) => {
    pobVillages.value = [];
    if (nv) {
        const response = await generateVillagesByCommune(nv);
        pobVillages.value = response.data.villages;
    };
    if (!pobVillages.value.find(v => v.id === studentObj.pob_village_id)) {
        studentObj.pob_village_id = null;
    }
});

// POR geography watchers
watch(() => studentObj.por_province_id, async (nv, ov) => {
    porDistricts.value = [];
    if (nv) {
        const response = await generateDistrictsByProvince(nv);
        porDistricts.value = response.data.districts;
    };
    if (!porDistricts.value.find(d => d.id === studentObj.por_district_id)) {
        studentObj.por_district_id = null;
    }
});
watch(() => studentObj.por_district_id, async (nv, ov) => {
    porCommunes.value = [];
    if (nv) {
        const response = await generateCommunesByDistrict(nv);
        porCommunes.value = response.data.communes;
    };
    if (!porCommunes.value.find(c => c.id === studentObj.por_commune_id)) {
        studentObj.por_commune_id = null;
    }
});
watch(() => studentObj.por_commune_id, async (nv, ov) => {
    porVillages.value = [];
    if (nv) {
        const response = await generateVillagesByCommune(nv);
        porVillages.value = response.data.villages;
    };
    if (!porVillages.value.find(v => v.id === studentObj.por_village_id)) {
        studentObj.por_village_id = null;
    }
});

async function buildFormData(data, includePhoto) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (key === 'photo') return;
        if (value !== null && value !== undefined) form.append(key, value);
    });
    if (includePhoto) {
        if (data.photo) {
            const blob = await (await fetch(data.photo)).blob();
            form.append('photo', blob, 'photo.jpg');
        } else {
            form.append('photo', '');
        }
    }
    return form;
}

async function saveStudent() {
    try {
        LoadingModal();
        let response = null;
        if (studentObj.id === null) {
            response = await apiCreateStudent(await buildFormData(studentObj, true));
            props.onCreated(response.data.student);
        } else {
            const photoChanged = currentImage.value !== studentObj.photo;
            response = await apiUpdateStudent(await buildFormData(studentObj, photoChanged));
            props.onUpdated(response.data.student);
        }
        hideModal();
        return MessageModal({ icon: "success", title: "Success", text: response.data.message });
    } catch (error) {
        const { response } = error;
        if (!response) {
            return MessageModal({ icon: "error", title: "Error", text: error.message });
        }
        const { status, data } = response;
        if (status === 422) {
            Object.keys(studentErrObj).forEach((key) => {
                studentErrObj[key] = data.errors[key]
                    ? data.errors[key][0]
                    : "";
            });
            return CloseModal();
        }
        return MessageModal({ icon: "error", title: "Error", text: data.message });
    }
}
async function viewStudent(id) {
    try {
        LoadingModal();
        const response = await apiReadStudent(id);
        const {
            photo, gender, nationality, ethnicity, religion,
            pob_village, pob_commune, pob_district, pob_province,
            por_village, por_commune, por_district, por_province,
            ...rest
        } = response.data.student;
        Object.assign(studentObj, {
            ...rest,
            gender_id: gender?.id ?? null,
            nationality_id: nationality?.id ?? null,
            ethnicity_id: ethnicity?.id ?? null,
            religion_id: religion?.id ?? null,
            pob_province_id: pob_province?.id ?? null,
            pob_district_id: pob_district?.id ?? null,
            pob_commune_id: pob_commune?.id ?? null,
            pob_village_id: pob_village?.id ?? null,
            por_province_id: por_province?.id ?? null,
            por_district_id: por_district?.id ?? null,
            por_commune_id: por_commune?.id ?? null,
            por_village_id: por_village?.id ?? null,
        });
        studentObj.photo = photo;
        currentImage.value = photo;
        showModal();
        return CloseModal();
    } catch (error) {
        return MessageModal({ icon: "error", title: "Error", text: error.response?.data?.message || error.message });
    }
}
async function removeStudent(id) {
    Swal.fire({
        title: 'Want to delete the student ?',
        html: '<pre>' + "Please make a confirmation." + '</pre>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Yes, Delete it.'
    }).then(async (sw) => {
        if (sw.isConfirmed) {
            try {
                LoadingModal();
                const response = await apiDeleteStudent(id);
                const { student, message } = response.data;
                props.onDeleted(student);
                return MessageModal({ icon: "success", title: "Success", text: message });
            } catch (error) {
                return MessageModal({ icon: "error", title: "Error", text: error.response?.data?.message || error.message });
            }
        }
    });
}

async function generateGenders() {
    const response = await apiGetAllGenders();
    genders.value = response.data.genders;
}
async function generateNationalities() {
    const response = await apiGetAllNationalities();
    nationalities.value = response.data.nationalities;
}
async function generateEthnicities() {
    const response = await apiGetAllEthnicities();
    ethnicities.value = response.data.ethnicities;
}
async function generateReligions() {
    const response = await apiGetAllReligions();
    religions.value = response.data.religions;
}
async function generateProvinces() {
    const response = await apiGetProvinces();
    provinces.value = response.data.provinces;
}
async function generateDistrictsByProvince(id) {
    const response = await apiGetDistrictsByProvince(id);
    return response;
}
async function generateCommunesByDistrict(id) {
    const response = await apiGetCommunesByDistrict(id);
    return response;
}
async function generateVillagesByCommune(id) {
    const response = await apiGetVillagesByCommune(id);
    return response;
}

const showModal = () => $('#STUDENT-MODAL').modal('show');
const hideModal = () => $('#STUDENT-MODAL').modal('hide');

defineExpose({
    showModal,
    hideModal,
    removeStudent,
    viewStudent
});
</script>