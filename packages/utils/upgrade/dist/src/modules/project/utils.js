'use strict';

var project = require('./project.js');

const isPluginProject = (project$1)=>{
    return project$1 instanceof project.PluginProject;
};
function assertPluginProject(project) {
    if (!isPluginProject(project)) {
        throw new Error('Project is not a plugin');
    }
}
const isApplicationProject = (project$1)=>{
    return project$1 instanceof project.AppProject;
};
function assertAppProject(project) {
    if (!isApplicationProject(project)) {
        throw new Error('Project is not an application');
    }
}

exports.assertAppProject = assertAppProject;
exports.assertPluginProject = assertPluginProject;
exports.isApplicationProject = isApplicationProject;
exports.isPluginProject = isPluginProject;
//# sourceMappingURL=utils.js.map
