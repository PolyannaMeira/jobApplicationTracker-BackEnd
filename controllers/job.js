import query from '../config/db.js';

const JOBS = [
    {
        id: 1,
        companyName: 'Meta from BE',
        jobTitle: 'Android Developer',
        link: 'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4008625158&eBP=CwEAAAGR0bnI8XPbg2ihaXaLR4dtIa2h9p5I23eNJKralKKxOY6WPybD5x4mtn34MZzlrJCwT7ttT8bVZSfYKDUdOPB7VDt2Oe3Vajfi6o_hKiYnpCxvisEmGFw_fPodQjAmXLxYGXRdjfWA-K9RovyTHism2dYwdK_cAbHwHxwzCzkrOWUUW4DoLNc7FBNI4m8dE-7CMWH-BWm0eLtSAnq7INKlry9zb82tqQ3yoo1AZejU4s__UAMjKUEK1wXwtGkZxSY9XHUgmpup1LupRo851Pty0gSI3r8zNyiYL1znmy8nXscyU5kW8WcU0VQVJl9xXC7o-SADbycAzSNS0QNsJCCZgdJ0wugRyg7wrJut0f4tjB22RktCra92Eez5Zj9UMR76alVgAmpabSl_Em2nvGVA69qkXyTCsK8-vTS07Lo2aYNNwVOVZPZFSYsPTpc7sjTMm_batGclUL0T3uwVq43oelU&refId=yK8BTUz42Q5pG%2B4vcFkRxQ%3D%3D&trackingId=P2ThKv3uuZZx0%2FYEG5I9oA%3D%3D'
    },
    {
        id: 2,
        companyName: 'Google',
        jobTitle: 'Front-end Engineer',
        link: 'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4003293629&eBP=CwEAAAGR0bnU3bIbX4294pO7YjKC6wbaUaL8Oyf4TMlZwjwIqIrWIEzuTUbvkndlgCRTCexiEzFWxj387QddAz1eQgQpfhHBXJXuOLFXOLL1_H30uMENjw4lPgl_SzXcvtMpK9L9C8JhlGrs7oWNdJR7S9ddDQ739udrg6PvR2fDyoLTljger5sC7sZeJTY9BilFBwo5RCYXr9_8ruOdwTQMsbTqAvyo8ge_0mCxSOfkDfIMxrd08bGRyff1LhEdTvpL72WhJ97Z7FTx1PwmTQy4DJxNlgoN3elybUQMKKXX4B9PG34fxyVzNdUWhwMkVFy1nKalwkSN0ravaWIpahwupjJykyF3DfCtGc3OUSAttuVegwySlVzR3dCO9fAsd0CS4gaKJPUtJL_bfVCtzEUE8mrN44wAkCTA7Jx6cR-CtTZQaEfTFIbgB50gQvSXkiel&refId=y0%2F2erna7u4YIy8sub1hnA%3D%3D&trackingId=jpmC8PSv4WSsSia46A1TfA%3D%3D'
    },
    {
        id: 3,
        companyName: 'Apple',
        jobTitle: 'Full-stack Developer',
        link: 'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4009268081&eBP=CwEAAAGR0bnU3ZigAXCE9hiT3v-iUX51V-vnIIM86xnKjIigTb6HUDJAimaxUhC-AkPbQsJ-1onYcbVIEerq0HHWTaNCI9zMjrwqYvgmofgyBrJ9ZtKMSC-f1ccmbYf6xyJQeoLcXj4LV-z7NIEcxj3TnM9Oq6zgbApCjEb7F5mzCeXE1zdtJ__tqPHbyBEf-CevXsM_IvqqfIOsWfsZusF2ar-zU1FhF4BUby_X-LAZLFe9FkyGcXdIjMFAjrzpkUbRSI8pYdw_J_pIs_wmTCOZZdBF6GqOdLk7bHMU_xyu19gFEqoxf5u9wKwZh4iwfluwv707YQ4rZQats7dpouwW-5WN976yfAQF2YoIEJYZ75-v5VWHROHNNAhDd-oCNNSQQVRt37qEaqI0bSVVnRvu8CYIyg8UBesCjAi0XAucQ2T9O6G1HcmYbONn1m0x-A&refId=y0%2F2erna7u4YIy8sub1hnA%3D%3D&trackingId=ESPEL6G8pqGFUhycElr0ZA%3D%3D'
    }
];

const jobControllers = {
    getMyJobs: async (req, res) => {
        return JOBS;
    }
};

export default jobControllers;
