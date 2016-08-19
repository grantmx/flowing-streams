<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:media="http://search.yahoo.com/mrss/"
xmlns:xs="http://www.w3.org/2001/XMLSchema"
xmlns:dcterms="http://purl.org/dc/terms/"
xmlns:php="http://php.net/xsl"
exclude-result-prefixes="xs">
  <xsl:output method="xml" />
  <xsl:template match="*">
   <xsl:element name="{local-name()}">
     <xsl:apply-templates/>
   </xsl:element>
</xsl:template>
 
  <xsl:template name="rss" match="/">
    <rss xmlns:media="http://search.yahoo.com/mrss/">
      <xsl:for-each select="rss">
        <xsl:variable name="var1_channel" select="channel" />
        <xsl:attribute name="version">
          <xsl:value-of select="string(@version)" />
        </xsl:attribute>
        <channel>
          <title>
            <xsl:value-of select="string($var1_channel/title)" />
          </title>
          <link>
            <xsl:value-of select="string($var1_channel/link)" />
          </link>
          <description>
            <xsl:value-of select="string($var1_channel/description)" />
          </description>
          <xsl:apply-templates name="item"
          select="channel/items/item" />
        </channel>
      </xsl:for-each>
    </rss>
  </xsl:template>
  <xsl:template name="item" match="item">
    <xsl:variable name="var1_content" select="content" />
    <xsl:variable name="var1_media" select="media" />
    <xsl:variable name="var2_resultof_cast" select="string(title)" />
    <xsl:variable name="var2_thumbnailUrl" select="thumbnailUrl" />
    <xsl:variable name="var2_createdAt" select="createdAt" />
    <xsl:variable name="var2_player" select="player" />

    <item>
      <title>
        <xsl:value-of select="$var2_resultof_cast" />
      </title>
      <link>
        <xsl:value-of select="string(link)" />
      </link>

      <description>
        <xsl:value-of select="string(description)" />
      </description>

      <media:group>
        <xsl:for-each select="$var1_content">
            <media:content>
              
              <xsl:attribute name="type">video/mp4</xsl:attribute>


              <xsl:attribute name="url">
                <xsl:value-of select="string(@url)" />
              </xsl:attribute>

              <xsl:attribute name="duration">              
                  <xsl:value-of select="string(floor(number(string($var1_media/duration))))" />             
              </xsl:attribute>  
            
            </media:content>
        </xsl:for-each>
      </media:group>

      <media:keywords> 
        <xsl:call-template name="implode">
          <xsl:with-param name="items" select="tags/tag" />
        </xsl:call-template>
      </media:keywords>

      <media:thumbnail>
        <xsl:copy-of select="$var2_thumbnailUrl/@node()" />
        <xsl:copy-of select="$var2_thumbnailUrl/node()" />
      </media:thumbnail>

      <media:player>
        <xsl:attribute name="url">
              <xsl:value-of select="string($var2_player/@url)" />
            </xsl:attribute>
        <xsl:copy-of select="$var2_player/node()" />
      </media:player>

      <media:rating scheme="urn:simple">b</media:rating>

      <pubdate>
        <xsl:value-of select="php:function('date', 'Y-m-d\ H:i:s\', sum($var2_createdAt))"/>
      </pubdate>

    </item>
  </xsl:template>

  <xsl:template name="implode">
    <xsl:param name="items" />
    <xsl:param name="separator" select="','" />
    <xsl:for-each select="$items">
      <xsl:if test="position() &gt; 1">
        <xsl:value-of select="$separator" />
      </xsl:if>
      <xsl:value-of select="." />
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
