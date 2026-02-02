import { PluginProject, AppProject } from './project.mjs';

const isPluginProject = (project)=>{
    return project instanceof PluginProject;
};
function assertPluginProject(project) {
    if (!isPluginProject(project)) {
        throw new Error('Project is not a plugin');
    }
}
const isApplicationProject = (project)=>{
    return project instanceof AppProject;
};
function assertAppProject(project) {
    if (!isApplicationProject(project)) {
        throw new Error('Project is not an application');
    }
}

export { assertAppProject, assertPluginProject, isApplicationProject, isPluginProject };
//# sourceMappingURL=utils.mjs.map
