#!/usr/bin/env bash

. ${BASH_SOURCE%/*}/../load_variables.sh

CURRENT_PATH=$(pwd)
GH_REPO=github.com/opfab/operatorfabric.git
HTTP_REPO="https://davidbinderRTE:${GH_DOC_TOKEN}@${GH_REPO}"
git clone $HTTP_REPO $HOME/documentation
version=$(echo "$OF_VERSION"| sed s/-SNAPSHOT//)
cd $OF_HOME
./gradlew generateSwaggerCodeDoc javadoc asciidoctor :ui:main:npm_run_compodoc
for prj in "${OF_REL_COMPONENTS[@]}"; do
  echo "copying $prj documentation"
  rm -r $HOME/documentation/projects/$prj/$version/*
  mkdir -p $HOME/documentation/projects/$prj/$version/reports/
  cp -r $prj/build/docs/* $HOME/documentation/projects/$prj/$version/.
  cp -r $prj/build/reports/* $HOME/documentation/projects/$prj/$version/reports/.
done
rm -r $HOME/documentation/projects/ui/main/$version/*
mkdir -p -p $HOME/documentation/projects/ui/main/$version/compodoc/
mkdir -p -p $HOME/documentation/projects/ui/main/$version/reports
mkdir -p $HOME/documentation/documentation/$version/
cp -r $OF_HOME/ui/main/documentation/* $HOME/documentation/projects/ui/main/$version/compodoc/.
cp -r $OF_HOME/ui/main/reports/* $HOME/documentation/projects/ui/main/$version/reports/.
cp -r $OF_HOME/build/asciidoc/html5/* $HOME/documentation/documentation/$version/.
cd $HOME/documentation
if [ -n "$(git status --porcelain)" ]; then
    echo "Changes to documentation detected, preparing commit"
    git add .
    git commit -m "Updating documentation for version ${OF_VERSION}"
    git push $HTTP_REPO master > /dev/null 2>&1
else
    echo "No changes to documentation detected"
fi

cd $CURRENT_PATH