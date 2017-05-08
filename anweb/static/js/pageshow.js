/**
 * @Time: 2017-4-19
 * @Author: Yo
 * @Email: YoLoveLIfe@outlook.com
 * @Desc: Function for DOM
 * */

/**
 * @Type: Object
 * @Desc: $.pageShow is the page-show for the app.
 * */
$.pageShow={};

/*-----------Group Page Data JS-----------*/
/**
 * @Type: Function
 * @Return: Null
 * @Usage: $.pageShow.groupInit()
 * @Desc: Function for init the group page.When you want to flush the page.
 * */
$.pageShow.groupInit=function(){
    var list=$.dataRecv.groupGetBkData();
    $.pageShow.groupTabDataFlush(list);
}

/**
 * @Type: Function
 * @Return: Null
 * @Usage: $.pageShow.groupTabDataFlush(group_list)
 * @Desc: group_list - js list of the group
 * */
$.pageShow.groupTabDataFlush=function(group_list){
    var string="<tr><th>#</th><th>GID</th><th>GName</th><th>GRemark</th><th>Status</th></tr>";
    var alive="<td><span class='label label-success'>Alived</span></td>";
    for(var i in group_list){
        for(var j=0;j<group_list[i].length;j++){
            var temp=JSON.parse(group_list[i][j]);
            if(temp['id']==1){
                continue;
            }
            string+="<tr class='grp-list'><td><input type='radio' name='radiogp' class='minimal' checked></td><td>"+temp['id']+"</td><td>"+temp['name']+"</td><td>"+temp['remark']+"</td>"+alive+"</tr>";
        }
    }
    $('table').html(string);
}

/**
 * @Type: Function
 * @Argv: if type==1 add.elif type==2 modify
 * @Return: Null
 * @Usage: $.pageShow.groupModalPutInfo()
 * @Desc: Input the selected group info to the modal
 * */
$.pageShow.groupModalPutInfo=function(type){
    var GID=document.getElementById('grpID');
    var GNAME=document.getElementById('grpName');
    var GREMARK=document.getElementById('grpRemark');
    if(type==2){
        var Element=$.devEops.searchChecked('grp-list');
        GID.setAttribute('value',Element.childNodes[1].innerHTML);
        GNAME.setAttribute('value',Element.childNodes[2].innerHTML);
        GREMARK.setAttribute('value',Element.childNodes[3].innerHTML);
    }
    else{
        GID.setAttribute('value','#NEW');
        GNAME.setAttribute('value','');
        GREMARK.setAttribute('value','');
    }
    return ;
}

/**
 * @Type: Function
 * @Argv: Null
 * @Return: Null
 * @Usage: $.pageShow.groupModalPostInfo()
 * @Desc:
 * */
$.pageShow.groupModalPostInfo=function(){
    var GID=document.getElementById('grpID');
    var GNAME=document.getElementById('grpName');
    var GREMARK=document.getElementById('grpRemark');
    var postdata;
    if(GID.value=='#NEW')
    {
        postdata={"groupid":1,"groupname":GNAME.value,"groupremark":GREMARK.value};
    }
    else{
        postdata={"groupid":GID.value,"groupname":GNAME.value,"groupremark":GREMARK.value};
    }
    $.dataRecv.groupModifyDatabase(postdata);
    $.pageShow.groupInit();
}
/*-----------Host Page Data JS-----------*/
/**
 * @Type: Function
 * @Argv: Null
 * @Return: Null
 * @Usage: $.pageShow.hostInit()
 * @Desc: Function for init the host page.When you want to flush the page.
 * */
$.pageShow.hostInit=function() {
    var objS=document.getElementById('groupselect');
    objS.options.length=0;
    var list=$.dataRecv.groupGetBkData();
    for(var i in list){
        for(var j=0;j<list[i].length;j++){
            var temp=JSON.parse(list[i][j]);
            if(temp['id']==1){
                var op=new Option(temp['name'],temp['id'])
                objS.options.add(op);
                op.selected=true;
                continue;
            }
            objS.options.add(new Option(temp['name'],temp['id']));
        }
    }
}
/**
 * @Type: Function
 * @Argv: Null
 * @Return: Null
 * @Usage: $.pageShow.ChoseGroup()
 * @Desc: Function for chose group.
 * */
$.pageShow.ChoseGroup=function(){
    var id=$.devEops.listPickUp('groupselect');
    var list=$.dataRecv.hostGetBkData(id);
    $.pageShow.hostTabDataFlush(list);
}

/**
 * @Type: Function
 * @Return: Null
 * @Usage: $.pageShow.hostTabDataFlush(host_list)
 * @Desc: host_list - js list of the group
 * */
$.pageShow.hostTabDataFlush=function(host_list){
    var string="";
    for(var i in host_list){
        for(var j=0;j<host_list[i].length;j++){
            var temp=JSON.parse(host_list[i][j]);
            if(temp['id']==1){
                continue;
            }
            string+="<tr><td><input type='radio' name='radiogp' class='minimal' checked></td><td>"+temp['id']+"</td><td>"+temp['name']+"</td><td>"+temp['sship']+"</td><td><button data-toggle='modal' data-target='#Hostarv'><i class='fa fa-info'></i></button></td><tr>";
        }
    }
    $('tbody').html(string);
}

/*-----------Search Page Data JS-----------*/
/**
 * @Type: Function
 * @Argv:
 * @Return: Null
 * @Usage: $.pageShow.SearchInfoResult()
 * */
$.pageShow.SearchInfoResult=function() {
    var NodeList=document.getElementsByClassName('manager-search-input');
    var Element=NodeList[NodeList.length-1];
    var string=Element.value;
    $.devEops.analyzeSearchItem(string);
}


/*-----------Batch Page Data JS-----------*/
/**
 * @Type: Argv
 * @Desc: the ip list for ansible
 * */
$.pageShow.AnsibleHostIDList={};

/**
 * @Type: Function
 * @Argv: soft_name - soft name
 * @Return: Null
 * @Usage: $.pageShow.versionFlush(appname);
 * @Desc: Use this function flush the version selected
 * */
$.pageShow.versionFlush=function(soft_name,select_id){
    var objS=document.getElementById(select_id);
    list=$.dataRecv.batchGetSoftVersion(soft_name);
    for(var i in list){
        for(var j=0;j<list[i].length;j++){
            var temp=JSON.parse(list[i][j]);
            objS.options.add(new Option(temp['soft_version'],temp['id']));
        }
    }
}

/**
 * @Type: Function
 * @Argv: inputclass - name of input tab's class
 * @Return: Null
 * @Usage: $.pageShow.clearBatchInputBox('mysqlinput')
 * @Desc: Clear the page input box.
 * */
$.pageShow.clearBatchInputBox=function(inputclass){
    var NodeList=document.getElementsByClassName(inputclass);
    if(NodeList.length==0){
        return;
    }else{
        for(var i=0;i<NodeList.length;i++){
            if(NodeList[i].value=="/usr/local"){
                continue;
            }
            NodeList[i].value="";
        }
    }
}

/**
 * @Type: Function
 * @Argv: list - list insert the select tab;select-id - select id
 * @Return: Null
 * @Usage: $.pageShow.rangeSelectInsert(list,select_id)
 * @Desc: Insert group or host data into the select table.
 */
$.pageShow.rangeSelectInsert=function(list,select_id){
    var objS=document.getElementById(select_id);
    objS.options.length=0;
    for(var i in list){
        for(var j=0;j<list[i].length;j++){
            var temp=JSON.parse(list[i][j]);
            if(temp['id']==1){
                continue;
            }
            objS.options.add(new Option(temp['name'],temp['id']));
        }
    }
    return ;
}


/**
 * @Type: Function
 * @Argv: NULL
 * @Return: NULL
 * @Usage: $.pageShow.rangeSelectGroup()
 * @Desc: Onchange Env for Group Select
 */
$.pageShow.rangeSelectGroup=function(){
    var objS=document.getElementById('range-group');
    var groupid=objS.options[objS.selectedIndex].value;
    var hostlist=$.dataRecv.hostGetBkData(groupid);
    $.pageShow.rangeSelectInsert(hostlist,'range-host');
}

/**
 * @Type: Function
 * @Argv: hostname Selected
 * @Return: Null
 * @Usage: $.pageShow.rangeSelected(hostname)
 * @Desc: like rangeSelectInsert.But not clear the all select options
 * */
$.pageShow.rangeSelectd=function(hostname,hostid){
    var objS=document.getElementById('range-selected');
    objS.options.add(new Option(hostname,hostid));
}

/**
 * @Type: Function
 * @Argv: inputclass - name of input tab's class
 * @Return: Null
 * @Usage: $.pageShow.clearBatchInputBox('mysqlinput')
 * @Desc: Clear the page input box.
 * */
$.pageShow.rangeSelectHost=function(){
    var objS=document.getElementById('range-host');
    var hostid=objS.options[objS.selectedIndex].value;
    var hostname=objS.options[objS.selectedIndex].label;
    if(!$.pageShow.AnsibleHostIDList.hasOwnProperty(hostname))//key not exsist
    {
        $.pageShow.AnsibleHostIDList[hostname]=hostid;
        $.pageShow.rangeSelectd(hostname,hostid);
    }
    return ;
}

/**
 * @Type: Function
 * @Argv: Null
 * @Return: Null
 * @Usage: $.pageShow.rangeSelectedRemove()
 * @Desc: Remove the select host
 * */
$.pageShow.rangeSelectedRemove=function () {
    var objS=document.getElementById('range-selected');
    var index=objS.selectedIndex;
    var hostid=objS.options[index].value;
    var hostname=objS.options[index].label;
    delete $.pageShow.AnsibleHostIDList[hostname];
    objS.options.remove(index);
    return ;
}