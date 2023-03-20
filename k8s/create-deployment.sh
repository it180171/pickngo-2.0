#!/usr/bin/env bash

# create the deployment.yaml file from the parts

OUTPUT=deployment.yaml
DEFAULT_EMAIL=john.doe@example.com

PARTS=$(find ./parts -type f -name "*.yaml" -print | sort)

echo "prepare $OUTPUT"

rm -f $OUTPUT
CNT=0
for file in $PARTS
do
    if [[ $CNT != "0" ]]
    then
        echo "---" >> $OUTPUT
    fi
    cat $file >> $OUTPUT
    let CNT+=1
done

cat deployment.yaml
echo "please run now: kubectl apply -f deployment.yaml"
exit 0
