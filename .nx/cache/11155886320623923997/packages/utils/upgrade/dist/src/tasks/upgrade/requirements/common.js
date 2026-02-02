'use strict';

var simpleGit = require('simple-git');
var requirement = require('../../../modules/requirement/requirement.js');

const REQUIRE_GIT_CLEAN_REPOSITORY = requirement.requirementFactory('REQUIRE_GIT_CLEAN_REPOSITORY', async (context)=>{
    const git = simpleGit({
        baseDir: context.project.cwd
    });
    const status = await git.status();
    if (!status.isClean()) {
        throw new Error('Repository is not clean. Please commit or stash any changes before upgrading');
    }
});
const REQUIRE_GIT_REPOSITORY = requirement.requirementFactory('REQUIRE_GIT_REPOSITORY', async (context)=>{
    const git = simpleGit({
        baseDir: context.project.cwd
    });
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
        throw new Error('Not a git repository (or any of the parent directories)');
    }
}).addChild(REQUIRE_GIT_CLEAN_REPOSITORY.asOptional());
const REQUIRE_GIT_INSTALLED = requirement.requirementFactory('REQUIRE_GIT_INSTALLED', async (context)=>{
    const git = simpleGit({
        baseDir: context.project.cwd
    });
    try {
        await git.version();
    } catch  {
        throw new Error('Git is not installed');
    }
}).addChild(REQUIRE_GIT_REPOSITORY.asOptional());
const REQUIRE_GIT = requirement.requirementFactory('REQUIRE_GIT', null).addChild(REQUIRE_GIT_INSTALLED.asOptional());

exports.REQUIRE_GIT = REQUIRE_GIT;
exports.REQUIRE_GIT_CLEAN_REPOSITORY = REQUIRE_GIT_CLEAN_REPOSITORY;
exports.REQUIRE_GIT_INSTALLED = REQUIRE_GIT_INSTALLED;
exports.REQUIRE_GIT_REPOSITORY = REQUIRE_GIT_REPOSITORY;
//# sourceMappingURL=common.js.map
