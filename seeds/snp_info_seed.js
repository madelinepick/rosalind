
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('snp_info').del(),

    // Inserts seed entries
    knex('snp_info').insert([
      {name: 'rs7089424', description: '1.7x increased risk for acute lymphoblastic leukemia', link: 'http://www.ncbi.nlm.nih.gov/pubmed/20919861?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs53576', description: 'Lack of empathy? You have a SNP in the oxytocin receptor which may make you less empathetic than most people. When under stress you may have more difficulty recognizing the emotional state of others.', link: 'http://www.ncbi.nlm.nih.gov/pubmed/19934046?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs1800497', description: 'More likely to have addictive behavior', link: 'http://www.ncbi.nlm.nih.gov/pubmed/24528631?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs17077540', description: '1.6x major depressive disorder risk', link: 'http://www.ncbi.nlm.nih.gov/pubmed/20125088?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs1121980', description: '1.67x risk for obesity', link: 'http://www.ncbi.nlm.nih.gov/pubmed/18379722?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs2241880', description: '.26x lower risk for chron\'s disease', link: 'http://www.ncbi.nlm.nih.gov/pubmed/17068223?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs13266634', description: 'increased risk for type-2 diabetes', link: 'http://www.ncbi.nlm.nih.gov/pubmed/17293876?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs2180439', description: 'Increased risk of Male Pattern Baldness', link: 'http://www.ncbi.nlm.nih.gov/pubmed/18849994?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs307377', description: 'Extra tasting ability? rare T allele, better at detecting umami', link: 'http://www.ncbi.nlm.nih.gov/pubmed/16782140?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs807701', description: '2-5x increased dyslexia risk ', link: 'http://www.ncbi.nlm.nih.gov/pubmed/23229871?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs664143', description: 'Higher risk for number of cancers', link: 'http://www.ncbi.nlm.nih.gov/pubmed/22203481?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs2802292', description: 'Less likely to live to 100. Unfortunately, this version of FOXO3 has reduced longevity.', link: 'http://www.ncbi.nlm.nih.gov/pubmed/19196970?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs1800955', description: 'Increased susceptibility to novelty seeking', link: 'http://www.ncbi.nlm.nih.gov/pubmed/22530780?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs4307059', description: '1.42x risk of Autism', link: 'http://www.ncbi.nlm.nih.gov/pubmed/19404256?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'},
      {name: 'rs10830963', description: 'increased type-2 diabetes risk', link: 'http://www.ncbi.nlm.nih.gov/pubmed/19241057?dopt=Abstract', advice_one: 'Advice one', advice_two: 'Advice two'}
    ])
  );
};
