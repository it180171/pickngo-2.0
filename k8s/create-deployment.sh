#!/usr/bin/env bash

# create the deployment.yaml file from the parts

EMAIL=$(echo $EMAIL_FROM_CMD_LINE | sed -e "s/@.*$//")
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
    let CNT+=1
done

cat deployment.yaml
echo "please run now: kubectl apply -f deployment.yaml"
exit 0
