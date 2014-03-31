module.exports = function(grunt){
	grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
		concat : {
            'dist/JChart.debug.js' :
                ['src/JChart.js','src/*.js']
		},
        uglify : {
            target : {
                files : {
                    'dist/JChart.min.js': 'dist/JChart.debug.js'
                }
            }
        }

	});
  	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

  	grunt.registerTask('default', ['concat','uglify']);
}