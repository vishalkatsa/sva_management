// Copyright (c) 2024, vk and contributors
// For license information, please see license.txt

frappe.ui.form.on("Panchayat", {
	refresh(frm) {
        console.log(frm);
        frm.fields_dict["block_name_p"].get_query = function (doc) {
            console.log(doc);
           
        };
	},
});
