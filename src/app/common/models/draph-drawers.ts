import * as d3 from 'd3';

export class StudentGraphDrawer {
  public update(svg: any, x: any,  y: any, height: number, data: any): void {
    const rectangles: any = svg.selectAll('rect').data(data);

    rectangles
      .enter()
      .append('rect')
      .merge(rectangles)
      .transition()
      .duration(1000)
      .attr('x', d => x(d.group))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#986406')
      .attr('opacity', 0.4);
  }

  public createGraph(selector: string, width: number, height: number, margin: any): d3.Selection<SVGGElement, unknown, HTMLElement, any> {
    return d3.select(selector)
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform',
              'translate(' + margin.left + ',' + margin.top + ')');
  }

  public createXAxis(svg: any, width: number, height: number, data: any): d3.ScaleBand<string> {
    const x: d3.ScaleBand<string> = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(d => d.group))
      .padding(0.2);

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    return x;
  }

  public createYAxis(svg: any, height: number): d3.ScaleLinear<number, number> {
    const y: d3.ScaleLinear<number, number> = d3.scaleLinear()
      .domain([0, 10])
      .range([ height, 0]);

    svg.append('g')
        .attr('class', 'yAxis')
        .call(d3.axisLeft(y));

    return y;
  }

  public draw(data: any, selector: string): void {
    const margin: any = { top: 30, right: 30, bottom: 70, left: 60 };
    const width: number = 460 - margin.left - margin.right;
    const height: number = 400 - margin.top - margin.bottom;

    const svg: d3.Selection<SVGGElement, unknown, HTMLElement, any> = this.createGraph(selector, width, height, margin);
    const x: d3.ScaleBand<string> = this.createXAxis(svg, width, height, data);
    const y: d3.ScaleLinear<number, number> = this.createYAxis(svg, height);

    this.update(svg, x, y, height, data);
  }
}

export class SubjectGraphDrawer {
  public getMidAngle(data: any): number {
    return data.startAngle + (data.endAngle - data.startAngle) / 2;
  }

  public addChartPolylines(svg: any, dataReady: any, arc: any, outerArc: any, radius: number): void {
    svg
      .selectAll('allPolylines')
      .data(dataReady)
      .enter()
      .append('polyline')
        .attr('stroke', 'black')
        .style('fill', 'none')
        .attr('stroke-width', 1)
        .attr('points', d => {
          const posA: number[] = arc.centroid(d);
          const posB: number[] = outerArc.centroid(d);
          const posC: number[] = outerArc.centroid(d);
          const midangle: number = this.getMidAngle(d);
          posC[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          return [posA, posB, posC];
        });
  }

  public addLabelPolylines(svg: any, dataReady: any, outerArc: any, radius: number): void {
    svg
      .selectAll('allLabels')
      .data(dataReady)
      .enter()
      .append('text')
        .text( d => d.data.key )
        .attr('transform', d => {
          const pos: number[] = outerArc.centroid(d);
          const midangle: number = this.getMidAngle(d);
          pos[0] = radius * 0.9 * (midangle < Math.PI ? 1 : -1);
          return 'translate(' + pos + ')';
        })
        .style('text-anchor', d => {
          const midangle: number = this.getMidAngle(d);
          return midangle < Math.PI ? 'start' : 'end';
        });
  }

  public buildPieChart(svg: any, dataReady: any, arc: any, color: any): void {
    svg
      .selectAll('allSlices')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.key) )
      .attr('stroke', '#ffffff')
      .style('stroke-width', '1px')
      .style('opacity', 0.6);
  }

  public createArc(radius: number, innerAlpha: number, outerAlpha: number): d3.Arc<any, d3.DefaultArcObject> {
    return d3.arc()
      .innerRadius(radius * innerAlpha)
      .outerRadius(radius * outerAlpha);
  }

  public computeEachGroupPosition(): d3.Pie<any, number | { valueOf(): number; }> {
    return d3.pie()
      .sort(null)
      .value((d: any) => d.value);
  }

  public createColorScale(names: string[]): d3.ScaleOrdinal<string, unknown> {
    return d3.scaleOrdinal()
      .domain(names)
      .range(d3.schemeDark2);
  }

  public createGraph(selector: string, width: number, height: number): d3.Selection<SVGGElement, unknown, HTMLElement, any> {
    return d3.select(selector)
      .append('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
  }

  public draw(data: any, selector: string): void {
    const width: number = 400;
    const height: number = 400;
    const margin: number = 40;
    const radius: number = Math.min(width, height) / 2 - margin;

    const svg: d3.Selection<SVGGElement, unknown, HTMLElement, any> = this.createGraph(selector, width, height);
    const color: d3.ScaleOrdinal<string, unknown> = this.createColorScale(Object.keys(data));
    const pie: d3.Pie<any, any> = this.computeEachGroupPosition();
    const dataReady: d3.PieArcDatum<any>[] = pie(d3.entries(data));
    const arc: d3.Arc<any, d3.DefaultArcObject> = this.createArc(radius, 0.1, 0.8);
    const outerArc: d3.Arc<any, d3.DefaultArcObject> = this.createArc(radius, 0.6, 0.9);

    this.buildPieChart(svg, dataReady, arc, color);
    this.addChartPolylines(svg, dataReady, arc, outerArc, radius);
    this.addLabelPolylines(svg, dataReady, arc, radius);
  }
}
