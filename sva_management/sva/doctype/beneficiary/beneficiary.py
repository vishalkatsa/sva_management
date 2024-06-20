# Copyright (c) 2024, vk and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Beneficiary(Document):
	pass

@frappe.whitelist(allow_guest=True)
def get_beneficiary_by_id(name):

	beneficiary = frappe.get_doc('Beneficiary', name)
	return beneficiary
