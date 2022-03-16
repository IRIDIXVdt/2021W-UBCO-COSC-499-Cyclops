export type solutionItem = {
	name: string;
	star: number;
	detail: string;
	section: string;
	

};
/*
{
	solutionId
	timestamp
	weight
	score
}
*/

export const sectionList: string[] = [
	"Climate Change",
	"Air Pollution",
	"Water Pollution",
	"Deforestation",
	"Overpopulation",
	"Loss of Biodiversity",
	"Waste Disposal",
	"Land Management",
	"Urban Sprawl",
];

export const ecoData: solutionItem[] = [
	{
		name: "Bianca Carroll",
		star: 2,
		detail: "ultricies ligula. Nullam enim.",
		section: "Overpopulation"
	},
	{
		name: "Kenneth Coffey",
		star: 4,
		detail: "amet ultricies sem magna nec",
		section: "Urban Sprawl"
	},
	{
		name: "Ethan Cervantes",
		star: 1,
		detail: "enim nisl elementum purus, accumsan interdum libero",
		section: "Urban Sprawl"
	},
	{
		name: "Ian Griffin",
		star: 4,
		detail: "Curae Phasellus ornare. Fusce",
		section: "Waste Disposal"
	},
	{
		name: "Scarlet Morrison",
		star: 3,
		detail: "dictum",
		section: "Waste Disposal"
	},
	{
		name: "Regan Rojas",
		star: 1,
		detail: "egestas rhoncus. Proin nisl sem, consequat",
		section: "Urban Sprawl"
	},
	{
		name: "Dominic Cantu",
		star: 4,
		detail: "ipsum dolor",
		section: "Urban Sprawl"
	},
	{
		name: "Beck Sanders",
		star: 3,
		detail: "ut lacus. Nulla tincidunt,",
		section: "Deforestation"
	},
	{
		name: "Hamish Hines",
		star: 4,
		detail: "molestie in, tempus eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed",
		section: "Waste Disposal"
	},
	{
		name: "Rahim Lloyd",
		star: 1,
		detail: "Curabitur egestas nunc sed libero. Proin sed",
		section: "Waste Disposal"
	},
	{
		name: "Minerva Church",
		star: 4,
		detail: "id, mollis nec, cursus a, enim. Suspendisse aliquet,",
		section: "Overpopulation"
	},
	{
		name: "Mira Butler",
		star: 4,
		detail: "vel turpis. Aliquam adipiscing",
		section: "Deforestation"
	},
	{
		name: "Zahir Terry",
		star: 1,
		detail: "est mauris, rhoncus id, mollis nec, cursus a, enim. Suspendisse aliquet,",
		section: "Water Pollution"
	},
	{
		name: "Sarah Malone",
		star: 3,
		detail: "egestas. Fusce aliquet",
		section: "Land projectManagement"
	},
	{
		name: "Jorden Pollard",
		star: 3,
		detail: "ante",
		section: "Deforestation"
	},
	{
		name: "Chadwick Bridges",
		star: 2,
		detail: "tempor augue ac ipsum. Phasellus",
		section: "Overpopulation"
	},
	{
		name: "Jade Anthony",
		star: 2,
		detail: "Fusce fermentum fermentum arcu. Vestibulum ante ipsum",
		section: "Loss of Biodiversity"
	},
	{
		name: "Summer Ashley",
		star: 2,
		detail: "nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue",
		section: "Air Pollution"
	},
	{
		name: "Marny Robles",
		star: 0,
		detail: "egestas blandit. Nam nulla magna, malesuada vel, convallis in, cursus et, eros. Proin ultrices.",
		section: "Waste Disposal"
	},
	{
		name: "Hyatt Knox",
		star: 1,
		detail: "amet massa. Quisque porttitor",
		section: "Water Pollution"
	},
	{
		name: "Lamar Jones",
		star: 2,
		detail: "amet orci. Ut sagittis lobortis mauris.",
		section: "Loss of Biodiversity"
	},
	{
		name: "Kylan Gilliam",
		star: 1,
		detail: "lacus. Quisque purus",
		section: "Urban Sprawl"
	},
	{
		name: "Christen Fitzgerald",
		star: 2,
		detail: "Nullam scelerisque neque sed sem egestas blandit. Nam nulla magna, malesuada",
		section: "Climate Change"
	},
	{
		name: "Isaiah Hewitt",
		star: 4,
		detail: "purus, in molestie tortor nibh sit amet orci.",
		section: "Water Pollution"
	},
	{
		name: "Adam Wooten",
		star: 3,
		detail: "tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit",
		section: "Overpopulation"
	},
	{
		name: "Talon Floyd",
		star: 4,
		detail: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque",
		section: "Deforestation"
	},
	{
		name: "Willow Johns",
		star: 3,
		detail: "vel est",
		section: "Deforestation"
	},
	{
		name: "Althea Daniels",
		star: 4,
		detail: "Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt",
		section: "Climate Change"
	},
	{
		name: "Gray Duran",
		star: 2,
		detail: "Phasellus nulla. Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus",
		section: "Waste Disposal"
	},
	{
		name: "Noble Horne",
		star: 0,
		detail: "non dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu. Vestibulum ante ipsum primis in faucibus",
		section: "Loss of Biodiversity"
	},
	{
		name: "Michael Farrell",
		star: 4,
		detail: "libero. Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate, nisi sem",
		section: "Land projectManagement"
	},
	{
		name: "Karina Briggs",
		star: 4,
		detail: "egestas nunc sed libero. Proin sed turpis nec mauris",
		section: "Urban Sprawl"
	},
	{
		name: "Ignatius Conrad",
		star: 4,
		detail: "nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce",
		section: "Air Pollution"
	},
	{
		name: "Jade Duffy",
		star: 1,
		detail: "Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra.",
		section: "Loss of Biodiversity"
	},
	{
		name: "Hakeem Wilcox",
		star: 3,
		detail: "libero. Proin sed",
		section: "Air Pollution"
	},
	{
		name: "Mason Solomon",
		star: 2,
		detail: "et libero. Proin mi. Aliquam",
		section: "Overpopulation"
	},
	{
		name: "Kelly Stephenson",
		star: 4,
		detail: "Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra",
		section: "Air Pollution"
	},
	{
		name: "Colin Tate",
		star: 2,
		detail: "mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et",
		section: "Climate Change"
	},
	{
		name: "Wayne Cain",
		star: 4,
		detail: "Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean",
		section: "Overpopulation"
	},
	{
		name: "Erasmus Lang",
		star: 3,
		detail: "enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id,",
		section: "Deforestation"
	},
	{
		name: "Sydnee Preston",
		star: 3,
		detail: "tempus scelerisque, lorem ipsum sodales purus, in",
		section: "Overpopulation"
	},
	{
		name: "Erica Kim",
		star: 3,
		detail: "Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate, nisi",
		section: "Climate Change"
	},
	{
		name: "Bell Fry",
		star: 3,
		detail: "et, commodo",
		section: "Loss of Biodiversity"
	},
	{
		name: "Gannon Brennan",
		star: 3,
		detail: "ante lectus convallis est, vitae sodales nisi",
		section: "Water Pollution"
	},
	{
		name: "Gavin Page",
		star: 0,
		detail: "feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam dictum sapien.",
		section: "Climate Change"
	}
];