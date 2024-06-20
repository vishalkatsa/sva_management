// Copyright (c) 2024, vk and contributors
// For license information, please see license.txt

frappe.ui.form.on("Beneficiary", {
    validate: function(frm) {
        var aadharNumber = frm.doc.father_or_mother_aadhar_no;
        // console.log("Aadhar Number: ", aadharNumber);   
        var aadharRegex = /^\d{12}$/;
        if (aadharNumber && !aadharRegex.test(aadharNumber)) {
            frappe.msgprint(__('Aadhar card number must be 12 digits and contain only numbers.'));
            frappe.validated = false;
        }
 
        // // Pan validation
        // const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        // const pan = frm.doc.pan_no;
        // // console.log("Pan Number",pan)
        // if (pan && !panRegex.test(pan)) {
        //     frappe.msgprint(__('Invalid PAN Number. Please enter a valid PAN.'));
        //     frappe.validated = false;
        // }
    },
    refresh(frm) {
        // userEmail = frappe.session.user
       
        if (frappe.user_roles.includes('FE')) {
            frm.set_df_property('status', 'read_only', 1);

        } if (frappe.user_roles.includes('System Manager')) {
            if (frm.doc.status === "Approve" || frm.doc.status === "Disapprove") {
                frm.set_df_property('status', 'read_only', 1);
            } else {
                frm.set_df_property('status', 'read_only', 0);
            }
        }
        frm.fields_dict["district"].get_query = function (doc) {

            if (doc.state) {
                return {
                    filters: {
                        state: doc.state
                    },
                    // page_length: 1000
                };
            } else {
                return {
                    filters: {
                        state: "please select state"
                    }
                };
            }
        };
        ///////////////////////////////////// block ///////////////////////////////////
        frm.fields_dict["block"].get_query = function (doc) {
            if (doc.district) {
                return {
                    filters: {
                        district_name: doc.district
                    },
                    page_length: 1000
                };
            } else {
                return {
                    filters: {
                        district_name: "please select district"
                    }
                };
            }
        };
        ///////////////////////////////////// panchayat ///////////////////////////////////
        frm.fields_dict["panchayat"].get_query = function (doc) {
            if (doc.block) {
                return {
                    filters: {
                        block_name: doc.block
                    },
                    page_length: 1000
                };
            } else {
                return {
                    filters: {
                        block_name: "please select block"
                    }
                };
            }
        };
        ///////////////////////////////////// village ///////////////////////////////////
        frm.fields_dict["village"].get_query = function (doc) {
            if (doc.panchayat) {
                return {
                    filters: {
                        panchayat: doc.panchayat
                    },
                    page_length: 1000
                };
            } else {
                return {
                    filters: {
                        panchayat: "please select panchayat"
                    }
                };
            }
        };
        ///////////////////////////////////// ward ///////////////////////////////////
        frm.fields_dict["ward"].get_query = function (doc) {
            if (doc.panchayat) {
                return {
                    filters: {
                        panchayat: doc.panchayat
                    },
                    page_length: 1000
                };
            } else {
                return {
                    filters: {
                        panchayat: "please select village"
                    }
                };
            }
        };
    },




    ////////////////////////// Upload Image Set on Preview /////////////////////////////

    upload_children_image: function (frm) {

        if (frm.doc.upload_children_image) {
            // Assuming 'upload_children_image' contains the image URL or file path
            frm.set_value("preview", 'http://sva.localhost:8000' + frm.doc.upload_children_image);
            frm.refresh_field("preview");
        } else {
            console.log("No image uploaded.");
        }
    },

    //////////////////////  Clear From /////////////////


    // ////////////////// state //////////////////
    status: function (frm) {
        let state = "state" in frm.doc;
        let certificate_no = "certificate_no" in frm.doc;

        if (frm.doc.status === "Approve" && state) {
            if (certificate_no === false) {
                const randomCertificateNo = frappe.utils.get_random(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
                frm.set_value("certificate_no", frm.doc.state + randomCertificateNo)
            } else {
                frappe.msgprint("Certificate No Already Able")
            }
        } else {
            frappe.msgprint("State does not exist in frm.doc");
        }
    },
    state: function (frm) {
        frm.fields_dict["district"].get_query = function (doc) {
            if (doc.state) {
                return {
                    filters: {
                        state: doc.state,
                    },
                    page_length: 1000
                };
            } else {
                return {
                    filters: { state: "please select state" }
                };
            }

        }
        frm.set_value('district', '')
    },
    ///////////////////// district ///////////////
    district: function (frm) {
        frm.set_value('block', '')

        frm.fields_dict["block"].get_query = function (doc) {
            if (doc.district) {
                return {
                    filters: {
                        district_name: doc.district
                    },
                    // page_length: 1000
                };
            } else {
                return {
                    filters: {
                        district_name: "please select district"
                    }
                };
            }
        };
    },
    ///////////////////// block ///////////////
    block: function (frm) {
        frm.set_value('panchayat', '')

        frm.fields_dict["panchayat"].get_query = function (doc) {
            if (doc.block) {
                return {
                    filters: {
                        block_name: doc.block
                    },
                    page_length: 1000
                };
            } else {
                return {
                    filters: {
                        block_name: "please select block"
                    }
                };
            }
        };
    },
    ///////////////////// panchayat //////////////////
    panchayat: function (frm) {
        frm.set_value('village', '')
        frm.set_value('ward', '')
        frm.fields_dict["village"].get_query = function (doc) {
            if (doc.panchayat) {
                return {
                    filters: {
                        panchayat: doc.panchayat
                    },
                    page_length: 1000
                };
            } else {
                return {
                    filters: {
                        panchayat: "please select panchayat"
                    }
                };
            }
        };
        frm.fields_dict["ward"].get_query = function (doc) {
            if (doc.panchayat) {
                return {
                    filters: {
                        panchayat: doc.panchayat
                    },
                    page_length: 1000
                };
            } else {
                return {
                    filters: {
                        panchayat: "please select village"
                    }
                };
            }
        };
    },

});

