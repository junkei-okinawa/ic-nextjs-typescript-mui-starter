#!/bin/sh

# 1 >>>>>>>>>>>>>>>>>>>>>>>
# "dfx.json"を解析してtarget_key_listで指定したkeyの順番にvalueを取得する。
# "frontend"キャニスターの"dependencies"を取得する。
target_file="dfx.json"
echo "target_file: ${target_file}"
target_key_list=(canisters frontend dependencies)
echo "target_key_list\n========="
for target_key in ${target_key_list[@]}
do
  echo $target_key
  last_target_key=$target_key
done
echo "========="

# >>>>> jsonを解析するための関数を定義
normalize_and_encode() (
  json=$(cat \
    | sed 's/\\"/\\042/g' \
    | sed 's/"[^"]*"/\n&\n/g' \
    | sed '/^"/!s/ //g' \
    | sed '/^"/{
      s/,/\\054/g
      s/\[/\\133/g
      s/\]/\\135/g
      s/{/\\173/g
      s/}/\\175/g
    }' \
    | tr -d '\n'
  )
  while printf %s "$json" | grep '[[{]' > /dev/null; do
    json=$(printf %s "$json" \
      | sed 's/[[{][^][}{]*[]}]/\n&\n/g' \
      | sed '/^[[{].*[]}]$/{
        s/\\/\\\\/g
        s/,/\\054/g
        s/\[/\\133/g
        s/\]/\\135/g
        s/{/\\173/g
        s/}/\\175/g
      }' \
      | tr -d '\n'
    )
  done
  printf %s "$json"
)
# >>>>> jsonを解析するための関数を定義

# >>>>> target_file が存在する場合はjsonを解析してfrontendキャニスターの依存キャニスターを取得
if [ -e $target_file ]
then
    root_val=$(cat ${target_file} | normalize_and_encode)
    # echo "root_val: ${root_val}"
    root=$(printf %b "$root_val" | tr -d '{}' | sed 's/,/\n/g')
    # echo "root: ${root}"
    val=$root
    for target_key in ${target_key_list[@]}
    do
      # echo $target_key
      target_val=$(printf %s "$val" | sed -n "s/^\"${target_key}\"://p")
      # echo "target_val: ${target_val}"
      val=$(printf %b "$target_val" | tr -d '{}' | sed 's/,/\n/g')
      # echo "val: ${val}"
    done
    # echo "val: ${val}"
else
    echo "Not Find ${target_file}"
fi
# <<<<< target_file が存在する場合はjsonを解析してfrontendキャニスターの依存キャニスターを取得
# 1 <<<<<<<<<<<<<<<<<<<<<<<

# 2 >>>>>>>>>>>>>>>>>>>>>>>
# 1で取得した"frontend"キャニスターの"dependencies"が空以外の場合は
# 対象のキャニスターがdeploy済かどうかをチェックし、deployされていない場合はdfx　deploy　${canister_id}する
# dfx generate を実行しfrontendキャニスターが依存しているcanistersのdeclarationsを出力する
val=$(printf %b "$val" | tr -d ',' | sed 's/\[//g' | sed 's/\]//g' | sed 's/\"//g')
echo $val
if [ -n "$val" ]; then
  for id in $val
  do
    echo "target canister: $id"
    exist_canister=$(dfx canister id $id)
    if [ -n "$exist_canister" ]; then
      echo "exist_canister: $exist_canister"
    else
      echo "canister not found: $id"
      dfx deploy $id
    fi
    dfx generate $id
  done
fi
# 2 <<<<<<<<<<<<<<<<<<<<<<<

# 3 >>>>>>>>>>>>>>>>>>>>>>>
# target_fileで定義されているlocalキャニスターのnetwork bindを取得し
# .env.developmentファイルに記述する
target_key_list=(networks local bind)
echo "target_key_list\n========="
for target_key in ${target_key_list[@]}
do
  echo $target_key
  last_target_key=$target_key
done
echo "========="

# >>>>> target_file が存在する場合はjsonを解析してnetwork bindを取得
if [ -e $target_file ]
then
    root_val=$(cat ${target_file} | normalize_and_encode)
    # echo "root_val: ${root_val}"
    root=$(printf %b "$root_val" | tr -d '{}' | sed 's/,/\n/g')
    # echo "root: ${root}"
    val=$root
    for target_key in ${target_key_list[@]}
    do
      # echo $target_key
      target_val=$(printf %s "$val" | sed -n "s/^\"${target_key}\"://p")
      # echo "target_val: ${target_val}"
      val=$(printf %b "$target_val" | tr -d '{}' | sed 's/,/\n/g')
      # echo "val: ${val}"
    done
    # echo "val: ${val}"
else
    echo "Not Find ${target_file}"
fi
# >>>>> target_file が存在する場合はjsonを解析してnetwork bindを取得
# 3 <<<<<<<<<<<<<<<<<<<<<<<

# 4 >>>>>>>>>>>>>>>>>>>>>>>
# 3で取得した"network"の"bind"が空以外の場合は
# .env.developmentファイルに記述する
val=$(printf %b "$val" | tr -d ',' | sed 's/\[//g' | sed 's/\]//g' | sed 's/\"//g')
echo $val
echo ${target_key_list[1]}
if [ -n "$val" ]; then
  echo "NEXT_PUBLIC_IC_HOST=$val" > .env.development
  echo "DFX_NETWORK=${target_key_list[1]}" >> .env.development
fi
# 4 <<<<<<<<<<<<<<<<<<<<<<<