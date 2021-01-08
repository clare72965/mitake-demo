describe("nb test", () => {

    beforeEach(function () {

    });


    it("function:train test", () => {
        songs = [];
        labels = [];
        allChords = [];
        labelCounts = [];
        train(imagine, 'easy');
        train(somewhere_over_the_rainbow, 'easy');

        expect(songs[0][0]).toEqual('easy');
        expect(songs[0][1]).toEqual(imagine);
        expect(labelCounts['easy']).toEqual(2);
        expect(labelCounts['medium']).toBeFalsy();
        expect(labelCounts['hard']).toBeFalsy();
    })


    it("function:getNumberOfSongs test", () => {
        songs = [1, 2, 3];
        var number = getNumberOfSongs();
        expect(number).toEqual(3);
    })

    it("function:setLabelProbabilities test", () => {
        abelCounts = [];
        labelCounts['easy'] = 5;
        labelCounts['hard'] = 3;
        songs = [[], [], [], [], [], [], [], []];
        setLabelProbabilities();
        expect(labelProbabilities['easy']).toEqual(5 / (labelCounts['easy'] + labelCounts['hard']));
        expect(labelProbabilities['hard']).toEqual(3 / (labelCounts['easy'] + labelCounts['hard']));
    })



    it("function:setChordCountsInLabels test", () => {
        chordCountsInLabels = {};
        songs = [
            [null, ['a']],
            ["easy", ["c", "cmaj7", "f", "g", "e7"]],
            ["easy", ["c", "cmaj7", "dm", "g", "e7"]],
            ["medium", ['cm', 'g', 'bb']],
        ];

        setChordCountsInLabels();
        expect(chordCountsInLabels['easy']).toEqual({ c: 2, cmaj7: 2, dm: 1, e7: 2, f: 1, g: 2 });
        expect(chordCountsInLabels['medium']).toEqual({ cm: 1, g: 1, bb: 1 });
        expect(chordCountsInLabels['hard']).toBeFalsy();
    })


    it("function:setProbabilityOfChordsInLabels test", () => {
        chordCountsInLabels = {};
        songs = [
            ["easy", ["c", "cmaj7", "f", "g", "e7"]],
            ["easy", ["c", "cmaj7", "dm", "g", "e7"]],
            ["medium", ['cm', 'g', 'bb']],
        ];

        chordCountsInLabels['easy'] = { c: 2, cmaj7: 2, dm: 1, e7: 2, f: 1, g: 2 };
        chordCountsInLabels['medium'] = { cm: 1, g: 1, bb: 3, };
        setProbabilityOfChordsInLabels();
        expect(probabilityOfChordsInLabels['easy']['c']).toEqual(2 * 1.0 / songs.length)
        expect(probabilityOfChordsInLabels['medium']['bb']).toEqual(3 * 1.0 / songs.length)
    })


    it("function:classify test", () => {
        labelProbabilities = {};
        chordCountsInLabels = {};
        probabilityOfChordsInLabels = {};
        songs = [];
        labelCounts = [];

        songs = [
            ["easy", ["c", "cmaj7", "f", "g", "e"]],
            ["medium", ['cm', 'g', 'bb']],
            ["medium", ['cm', 'a']],
            ["medium", ['cm', 'em7']]
        ];

        labelCounts['easy'] = 1;
        labelCounts['medium'] = 3;

        labelProbabilities['easy'] = labelCounts['easy'] / songs.length;     // 1/4=0.25
        labelProbabilities['medium'] = labelCounts['medium'] / songs.length; // 3/4=0.75

        chordCountsInLabels['easy'] = { c: 1, cmaj7: 1, f: 1, g: 1, e: 1 };
        chordCountsInLabels['medium'] = { cm: 3, g: 1, bb: 1, a: 1, em7: 1 };

        // chordCountsInLabels['easy'][i] * 1.0 / songs.length;
        probabilityOfChordsInLabels['easy'] = { c: 0.25, cmaj7: 0.25, f: 0.25, g: 0.25, e: 0.25 };
        probabilityOfChordsInLabels['medium'] = { cm: 0.75, g: 0.25, bb: 0.25, a: 0.25, em7: 0.25 };

        var easy_first = labelCounts['easy'] / songs.length + 1.01;
        var medium_first = labelCounts['medium'] / songs.length + 1.01;

        classify(['d', 'g', 'e', 'dm']);
        expect(classified['easy']).toEqual(easy_first * (0.25 + 1.01) * (0.25 + 1.01));
        expect(classified['medium']).toEqual(medium_first * (0.25 + 1.01));


        classify(['f#m7', 'cm', 'dadd9', 'g', 'bm', 'bm7', 'd', 'bb']);
        expect(classified['easy']).toEqual(easy_first * (0.25 + 1.01));
        expect(classified['medium']).toEqual(medium_first * (0.75 + 1.01) * (0.25 + 1.01) * (0.25 + 1.01));

    })


})