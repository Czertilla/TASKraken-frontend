
export const cr_struct_rights = [
	{
		value: "org",
		label: "Во всей организации" // TODO I18
	}, 
	{
		value: "overstruct",
		label: "В верхней структуре" // TODO I18
	}, 
	{
		value: "struct",
		label: "В текущей структуре" // TODO I18
	}, 
	{
		value: "false",
		label: "нигде" // TODO I18
	}
]; 

export const cr_roles_rights = [
	{
		value: "org",
		label: "Во всей организации" // TODO I18
	}, 
	{
		value: "ovestruct",
		label: "В верхней структуре" // TODO I18
	}, 
	{
		value: "level",
		label: "такого же уровня" // TODO I18
	}, 
	{
		value: "struct",
		label: "В текущей структуре" // TODO I18
	}, 
	{
		value: "downstream",
		label: "В посредсвенном подчинении" // TODO I18
	}, 
	{
		value: "subord",
		label: "В непосредсвенном подчинении" // TODO I18
	}, 
	{
		value: "false",
		label: "нигде" // TODO I18
	}
]; 

export const send_task_rights = [
	{
		value: "everyone",
		label: "всем" // TODO I18
	}, 
	{
		value: "org",
		label: "всем в огранизации" // TODO I18
	}, 
	{
		value: "struct",
		label: "всем в структуре" // TODO I18
	}, 
	{
		value: "downstream",
		label: "посредственным подчиненным" // TODO I18
	}, 
	{
		value: "direct",
		label: "непосредственным подчиненным" // TODO I18
	}, 
	{
		value: "false",
		label: "никому" // TODO I18
	}
]; 


export const send_petition_rights = [
	{
		value: "everyone",
		label: "всем" // TODO I18
	}, 
	{
		value: "org",
		label: "всем в огранизации" // TODO I18
	}, 
	{
		value: "struct",
		label: "всем в структуре" // TODO I18
	}, 
	{
		value: "upstream",
		label: "любому начальнику" // TODO I18
	}, 
	{
		value: "direct",
		label: "непосредственому начальнику" // TODO I18
	}, 
	{
		value: "false",
		label: "никому" // TODO I18
	}
];

export const reject_task_rights = [
	{
		value: "everyone",
		label: "все" // TODO I18
	}, 
	{
		value: "struct",
		label: "все в структуре" // TODO I18
	}, 
	{
		value: "undirect",
		label: "не непосредственный начальник" // TODO I18
	}, 
    {
        value: "level",
		label: "такого же уровня" // TODO I18
	}, 
	{
		value: "false",
		label: "никто" // TODO I18
	}
]

export const edit_other_rights = [
    {
		value: "org",
		label: "всем в огранизации" // TODO I18
	}, 
	{
		value: "struct",
		label: "всем в структуре" // TODO I18
	},
	{
		value: "direct",
		label: "непосредственым подчиненным" // TODO I18
	}, 
	{
		value: "false",
		label: "никому" // TODO I18
	}
]
