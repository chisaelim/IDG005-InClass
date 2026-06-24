<template>
    <div class="content-wrapper" style="min-height: 1175px;">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Dashboard</h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="container-fluid">

                <!-- Stat cards -->
                <div class="row">
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-info">
                            <div class="inner">
                                <h3>{{ totals.students }}</h3>
                                <p>Total Students</p>
                            </div>
                            <div class="icon"><i class="fa fa-users"></i></div>
                            <router-link :to="{ name: 'Students' }" class="small-box-footer">
                                View Details <i class="fa fa-arrow-circle-right"></i>
                            </router-link>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-success">
                            <div class="inner">
                                <h3>{{ totals.tests }}</h3>
                                <p>Total Tests</p>
                            </div>
                            <div class="icon"><i class="fa fa-graduation-cap"></i></div>
                            <router-link :to="{ name: 'Tests' }" class="small-box-footer">
                                View Details <i class="fa fa-arrow-circle-right"></i>
                            </router-link>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-warning">
                            <div class="inner">
                                <h3>{{ totals.student_tests }}</h3>
                                <p>Total Student Tests</p>
                            </div>
                            <div class="icon"><i class="fa fa-clipboard-check"></i></div>
                            <router-link :to="{ name: 'StudentTests' }" class="small-box-footer">
                                View Details <i class="fa fa-arrow-circle-right"></i>
                            </router-link>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-danger">
                            <div class="inner">
                                <h3>{{ totals.new_students_this_month }}</h3>
                                <p>New Students This Month</p>
                            </div>
                            <div class="icon"><i class="fa fa-user-plus"></i></div>
                            <router-link :to="{ name: 'Students' }" class="small-box-footer">
                                View Details <i class="fa fa-arrow-circle-right"></i>
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Row: registrations over time + status overall -->
                <div class="row">
                    <div class="col-lg-8">
                        <div class="card card-outline card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Student Registrations in the Last 12 Months</h3>
                            </div>
                            <div class="card-body">
                                <VueApexChart type="area" height="320" :options="registrationsOptions"
                                    :series="registrationsSeries" />
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="card card-outline card-warning">
                            <div class="card-header">
                                <h3 class="card-title">Overall Test Status</h3>
                            </div>
                            <div class="card-body">
                                <VueApexChart type="donut" height="320" :options="statusOptions"
                                    :series="statusSeries" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Row: tests popularity (pass/fail/pending stacked) -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card card-outline card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Test Popularity by Subject</h3>
                            </div>
                            <div class="card-body">
                                <VueApexChart type="bar" height="340" :options="testsOptions" :series="testsSeries" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Row: gender + religion -->
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card card-outline card-info">
                            <div class="card-header">
                                <h3 class="card-title">Students by Gender</h3>
                            </div>
                            <div class="card-body">
                                <VueApexChart type="pie" height="320" :options="genderOptions" :series="genderSeries" />
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="card card-outline card-success">
                            <div class="card-header">
                                <h3 class="card-title">Students by Religion</h3>
                            </div>
                            <div class="card-body">
                                <VueApexChart type="donut" height="320" :options="religionOptions"
                                    :series="religionSeries" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Row: nationality + ethnicity -->
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card card-outline card-secondary">
                            <div class="card-header">
                                <h3 class="card-title">Students by Nationality (Top 10)</h3>
                            </div>
                            <div class="card-body">
                                <VueApexChart type="bar" height="320" :options="nationalityOptions"
                                    :series="nationalitySeries" />
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="card card-outline card-danger">
                            <div class="card-header">
                                <h3 class="card-title">Students by Ethnicity (Top 10)</h3>
                            </div>
                            <div class="card-body">
                                <VueApexChart type="bar" height="320" :options="ethnicityOptions"
                                    :series="ethnicitySeries" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { apiGetDashboardStats } from "@/functions/api/dashboard";
import { LoadingModal, CloseModal, MessageModal } from "@/functions/swal";
import { ref, computed, onMounted } from "vue";

const stats = ref({
    totals: { students: 0, tests: 0, student_tests: 0, student_tests_today: 0, new_students_this_month: 0 },
    registrations_by_month: [],
    status_today: { PASSED: 0, PENDING: 0, FAILED: 0 },
    status_overall: { PASSED: 0, PENDING: 0, FAILED: 0 },
    by_gender: [],
    by_religion: [],
    by_nationality: [],
    by_ethnicity: [],
    by_test: [],
});

const totals = computed(() => stats.value.totals);

// Registrations
const registrationsSeries = computed(() => [
    { name: "New Students", data: stats.value.registrations_by_month.map((b) => b.count) },
]);
const registrationsOptions = computed(() => ({
    chart: { toolbar: { show: false }, fontFamily: "inherit" },
    xaxis: { categories: stats.value.registrations_by_month.map((b) => b.label) },
    yaxis: { labels: { formatter: (v) => Math.round(v) } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#007bff"],
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
    grid: { borderColor: "#eee" },
    tooltip: { y: { formatter: (v) => `${v} Students` } },
}));

// Status (overall)
const statusSeries = computed(() => {
    const s = stats.value.status_overall;
    return [s.PASSED, s.PENDING, s.FAILED];
});
const statusOptions = computed(() => ({
    chart: { fontFamily: "inherit" },
    labels: ["Passed", "Pending", "Failed"],
    colors: ["#28a745", "#ffc107", "#dc3545"],
    legend: { position: "bottom" },
    dataLabels: { enabled: true, formatter: (v) => `${Math.round(v)}%` },
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    total: { show: true, label: "Total", formatter: () => String(totals.value.student_tests) },
                },
            },
        },
    },
    noData: { text: "No data available" },
}));

// Tests popularity (stacked PASSED/PENDING/FAILED per test)
const testsSeries = computed(() => [
    { name: "Passed", data: stats.value.by_test.map((t) => t.passed) },
    { name: "Pending", data: stats.value.by_test.map((t) => t.pending) },
    { name: "Failed", data: stats.value.by_test.map((t) => t.failed) },
]);
const testsOptions = computed(() => ({
    chart: { type: "bar", stacked: true, toolbar: { show: false }, fontFamily: "inherit" },
    plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: "55%" } },
    xaxis: { categories: stats.value.by_test.map((t) => t.label) },
    dataLabels: { enabled: false },
    colors: ["#28a745", "#ffc107", "#dc3545"],
    legend: { position: "top" },
    grid: { borderColor: "#eee" },
    noData: { text: "No data available" },
}));

// Gender (pie)
const genderSeries = computed(() => stats.value.by_gender.map((r) => r.count));
const genderOptions = computed(() => ({
    chart: { fontFamily: "inherit" },
    labels: stats.value.by_gender.map((r) => r.label),
    colors: ["#17a2b8", "#e83e8c", "#6f42c1", "#fd7e14"],
    legend: { position: "bottom" },
    noData: { text: "No data available" },
}));

// Religion (donut)
const religionSeries = computed(() => stats.value.by_religion.map((r) => r.count));
const religionOptions = computed(() => ({
    chart: { fontFamily: "inherit" },
    labels: stats.value.by_religion.map((r) => r.label),
    colors: ["#28a745", "#20c997", "#17a2b8", "#6610f2", "#fd7e14", "#6c757d"],
    legend: { position: "bottom" },
    noData: { text: "No data available" },
}));

// Nationality (horizontal bar, top 10)
const nationalitySeries = computed(() => [
    { name: "Number of Students", data: stats.value.by_nationality.map((r) => r.count) },
]);
const nationalityOptions = computed(() => ({
    chart: { toolbar: { show: false }, fontFamily: "inherit" },
    xaxis: { categories: stats.value.by_nationality.map((r) => r.label) },
    plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
    dataLabels: { enabled: true },
    colors: ["#6c757d"],
    grid: { borderColor: "#eee" },
    noData: { text: "No data available" },
}));

// Ethnicity (vertical bar, top 10)
const ethnicitySeries = computed(() => [
    { name: "Number of Students", data: stats.value.by_ethnicity.map((r) => r.count) },
]);
const ethnicityOptions = computed(() => ({
    chart: { toolbar: { show: false }, fontFamily: "inherit" },
    xaxis: { categories: stats.value.by_ethnicity.map((r) => r.label) },
    plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    colors: ["#dc3545"],
    grid: { borderColor: "#eee" },
    noData: { text: "No data available" },
}));

onMounted(async () => {
    try {
        LoadingModal();
        const response = await apiGetDashboardStats();
        stats.value = response.data;
        CloseModal();
    } catch (error) {
        MessageModal({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || error.message,
        });
    }
});
</script>