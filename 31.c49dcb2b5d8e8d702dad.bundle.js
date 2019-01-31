(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{1058:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var lib=__webpack_require__(0),d3=__webpack_require__(675),d3_default=__webpack_require__.n(d3),prop_types=__webpack_require__(87),prop_types_default=__webpack_require__.n(prop_types),dataTables_bootstrap=__webpack_require__(797),dataTables_bootstrap_default=__webpack_require__.n(dataTables_bootstrap),purify=__webpack_require__(1048),purify_default=__webpack_require__.n(purify),number_format_lib=__webpack_require__(674),time_format_lib=__webpack_require__(693);__webpack_require__(799);const $=dataTables_bootstrap_default.a.$,propTypes={data:prop_types_default.a.arrayOf(prop_types_default.a.object),height:prop_types_default.a.number,alignPositiveNegative:prop_types_default.a.bool,colorPositiveNegative:prop_types_default.a.bool,columns:prop_types_default.a.arrayOf(prop_types_default.a.shape({key:prop_types_default.a.string,label:prop_types_default.a.string,format:prop_types_default.a.string})),filters:prop_types_default.a.object,includeSearch:prop_types_default.a.bool,metrics:prop_types_default.a.arrayOf(prop_types_default.a.oneOfType([prop_types_default.a.string,prop_types_default.a.object])),onAddFilter:prop_types_default.a.func,onRemoveFilter:prop_types_default.a.func,orderDesc:prop_types_default.a.bool,pageLength:prop_types_default.a.oneOfType([prop_types_default.a.number,prop_types_default.a.string]),percentMetrics:prop_types_default.a.arrayOf(prop_types_default.a.oneOfType([prop_types_default.a.string,prop_types_default.a.object])),tableFilter:prop_types_default.a.bool,tableTimestampFormat:prop_types_default.a.string,timeseriesLimitMetric:prop_types_default.a.oneOfType([prop_types_default.a.string,prop_types_default.a.object])},formatValue=Object(number_format_lib.getNumberFormatter)(number_format_lib.NumberFormats.INTEGER),formatPercent=Object(number_format_lib.getNumberFormatter)(number_format_lib.NumberFormats.PERCENT_3_POINT);function NOOP(){}function TableVis(element,props){const{data:data,height:height,alignPositiveNegative:alignPositiveNegative=!1,colorPositiveNegative:colorPositiveNegative=!1,columns:columns,filters:filters={},includeSearch:includeSearch=!1,metrics:rawMetrics,onAddFilter:onAddFilter=NOOP,onRemoveFilter:onRemoveFilter=NOOP,orderDesc:orderDesc,pageLength:pageLength,percentMetrics:percentMetrics,tableFilter:tableFilter,tableTimestampFormat:tableTimestampFormat,timeseriesLimitMetric:timeseriesLimitMetric}=props,$container=$(element);$container.addClass("superset-legacy-chart-table");const metrics=(rawMetrics||[]).map(m=>m.label||m).concat((percentMetrics||[]).map(m=>`%${m}`)).filter(m=>"number"==typeof data[0][m]);function col(c){const arr=[];for(let i=0;i<data.length;i+=1)arr.push(data[i][c]);return arr}const maxes={},mins={};for(let i=0;i<metrics.length;i+=1)alignPositiveNegative?maxes[metrics[i]]=d3_default.a.max(col(metrics[i]).map(Math.abs)):(maxes[metrics[i]]=d3_default.a.max(col(metrics[i])),mins[metrics[i]]=d3_default.a.min(col(metrics[i])));const tsFormatter=Object(time_format_lib.getTimeFormatter)(tableTimestampFormat),div=d3_default.a.select(element);div.html("");const table=div.append("table").classed("dataframe dataframe table table-striped table-condensed table-hover dataTable no-footer",!0).attr("width","100%");table.append("thead").append("tr").selectAll("th").data(columns.map(c=>c.label)).enter().append("th").text(d=>d),table.append("tbody").selectAll("tr").data(data).enter().append("tr").selectAll("td").data(row=>columns.map(({key:key,format:format})=>{const val=row[key];let html;const isMetric=metrics.indexOf(key)>=0;return"__timestamp"===key&&(html=tsFormatter(val)),"string"==typeof val&&(html=`<span class="like-pre">${purify_default.a.sanitize(val)}</span>`),isMetric&&(html=Object(number_format_lib.getNumberFormatter)(format)(val)),"%"===key[0]&&(html=formatPercent(val)),{col:key,val:val,html:html,isMetric:isMetric}})).enter().append("td").style("background-image",d=>{if(d.isMetric){const r=colorPositiveNegative&&d.val<0?150:0;if(alignPositiveNegative){const perc=Math.abs(Math.round(d.val/maxes[d.col]*100));return`linear-gradient(to right, rgba(${r},0,0,0.2), rgba(${r},0,0,0.2) ${perc}%, `+`rgba(0,0,0,0.01) ${perc}%, rgba(0,0,0,0.001) 100%)`}const posExtent=Math.abs(Math.max(maxes[d.col],0)),negExtent=Math.abs(Math.min(mins[d.col],0)),tot=posExtent+negExtent,perc1=Math.round(Math.min(negExtent+d.val,negExtent)/tot*100),perc2=Math.round(Math.abs(d.val)/tot*100);return`linear-gradient(to right, rgba(0,0,0,0.01), rgba(0,0,0,0.001) ${perc1}%, `+`rgba(${r},0,0,0.2) ${perc1}%, rgba(${r},0,0,0.2) ${perc1+perc2}%, `+`rgba(0,0,0,0.01) ${perc1+perc2}%, rgba(0,0,0,0.001) 100%)`}return null}).classed("text-right",d=>d.isMetric).attr("title",d=>"string"==typeof d.val?d.val:Number.isNaN(d.val)?null:formatValue(d.val)).attr("data-sort",d=>d.isMetric?d.val:null).classed("filtered",d=>filters&&filters[d.col]&&filters[d.col].indexOf(d.val)>=0).on("click",function(d){if(!d.isMetric&&tableFilter){d3_default.a.select(this).classed("filtered")?(onRemoveFilter(d.col,[d.val]),d3_default.a.select(this).classed("filtered",!1)):(d3_default.a.select(this).classed("filtered",!0),onAddFilter(d.col,[d.val]))}}).style("cursor",d=>d.isMetric?"":"pointer").html(d=>d.html?d.html:d.val);const paging=pageLength&&pageLength>0,datatable=$container.find(".dataTable").DataTable({paging:paging,pageLength:pageLength,aaSorting:[],searching:includeSearch,bInfo:!1,scrollY:`${height}px`,scrollCollapse:!0,scrollX:!0});let sortBy;!function($tableDom,height){const headHeight=$tableDom.find(".dataTables_scrollHead").height(),filterHeight=$tableDom.find(".dataTables_filter").height()||0,pageLengthHeight=$tableDom.find(".dataTables_length").height()||0,paginationHeight=$tableDom.find(".dataTables_paginate").height()||0,controlsHeight=pageLengthHeight>filterHeight?pageLengthHeight:filterHeight;$tableDom.find(".dataTables_scrollBody").css("max-height",height-headHeight-controlsHeight-paginationHeight)}($container.find(".dataTables_wrapper"),height);const limitMetric=Array.isArray(timeseriesLimitMetric)?timeseriesLimitMetric[0]:timeseriesLimitMetric;if(limitMetric?sortBy=limitMetric.label||limitMetric:metrics.length>0&&(sortBy=metrics[0]),sortBy){const index=columns.map(c=>c.key).indexOf(sortBy);datatable.column(index).order(orderDesc?"desc":"asc"),metrics.indexOf(sortBy)<0&&datatable.column(index).visible(!1)}datatable.draw()}TableVis.displayName="TableVis",TableVis.propTypes=propTypes;var Table=TableVis;__webpack_exports__.default=Object(lib.reactify)(Table)}}]);
//# sourceMappingURL=31.c49dcb2b5d8e8d702dad.bundle.js.map