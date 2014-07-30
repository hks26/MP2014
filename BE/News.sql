select URL.newsItemId, 
	companyId,
	companyName,
	stocksymbol, 
	headline, 
	URL,
	industryGroup,
	industrySubGroup,
	industrySector,
	displayDateUTC,
	creationDateUTC,
	body,
	synopsis
    from [News].[dbo].[NewsItemToUrl_tbl]as URL  join
	(select 
	headline,
	companyName,
	stockSymbol,
	industryGroup,
	industrySubGroup,
	industrySector,
	newsItemId,
	displayDateUTC,
	creationDateUTC,
	body,
	sourceId,
	synopsis,
	artInfo.companyId
    from [News].[dbo].[NewsCompanyInfo_tbl] as company join 
(select Top 1000 [News].[dbo].[NewsItemToCompany_tbl].[newsItemId],
[displayDateUTC],
	[creationDateUTC],
	[headline],
	[body],
	[sourceId],
	[synopsis],
	[companyId]
	from [News].[dbo].[NewsItem_tbl]
join [News].[dbo].[NewsItemToCompany_tbl] on [News].[dbo].[NewsItem_tbl].newsItemId = [News].[dbo].[NewsItemToCompany_tbl].newsItemId
where [News].[dbo].[NewsItemToCompany_tbl].companyId = '9938532'or [News].[dbo].[NewsItemToCompany_tbl].companyId = '319676'or [News].[dbo].[NewsItemToCompany_tbl].companyId = '862598' order by displayDateUTC desc) as artInfo 
on company.companyId = artInfo.companyId) as minusURL
on URL.newsItemId = minusURL.newsItemId