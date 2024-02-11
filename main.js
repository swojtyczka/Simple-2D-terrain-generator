const GENERATOR = {
	chunkSize: 32,

	structures: [
		{
			tile: '⛵',
			canSpawnOn: ['🟦'],
			probability: 0.001
		},
		{
			tile: '🌳',
			canSpawnOn: ['🟩'],
			probability: 0.05
		},
		{
			tile: '🌵',
			canSpawnOn: ['🟨'],
			probability: 0.05	
		},
		{
			tile: '⛺',
			canSpawnOn: ['🟩'],
			probability: 0.005	
		},
		{
			tile: '🛕',
			canSpawnOn: ['🟨'],
			probability: 0.0005	
		},
		{
			tile: '🌴',
			canSpawnOn: ['🟨'],
			probability: 0.05
		},
		{
			tile: '🌷',
			canSpawnOn: ['🟩'],
			probability: 0.005
		},
		{
			tile: '🌹',
			canSpawnOn: ['🟩'],
			probability: 0.005
		},
		{
			tile: '🌼',
			canSpawnOn: ['🟩'],
			probability: 0.005
		},
		{
			tile: '🌻',
			canSpawnOn: ['🟩'],
			probability: 0.005
		}
	]
}

function generate(gen) {
	chunk = [];

	// RAW TERRAIN
	size = gen.chunkSize;

	for (i = -Math.floor(size / 2); i <= Math.floor(size / 2); i++) {
		row = []
		for (j = -Math.floor(size / 2); j <= Math.floor(size / 2); j++) {
			var value = perlin.get(i / size, j / size);

			if (value > 0.1)
				row.push('🟩');
			else if (value < -0.1)
				row.push('🟦');
			else 
				row.push('🟨')
		}
		chunk.push(row);
	}

	// STRUCTURES
	gen.structures.forEach(struct => {
		chunk.forEach(function (row, index, _row) {
			_row[index].forEach(function (block, index2, _block) {
				if (struct.canSpawnOn.includes(_block[index2]))
					if (Math.random() < struct.probability)
						_block[index2] = struct.tile;
			});
		});
	});


	return chunk;
}


world = generate(GENERATOR);

$("#world").html(function () {
	res = "";
	world.forEach(row => {
		res+="<div>"
		row.forEach(block => {
			res += "<div class='block'>"+block+"</div>";
		});
		res += "</div>";
	});
	return res;
});