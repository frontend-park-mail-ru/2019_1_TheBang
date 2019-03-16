import './leaderboard.scss'

const leaderboard = () =>
    `
<style>
tbody tr:hover {
    background-color: #415A97;
}

</style>
    <table class="leaderboard" style="width: 500px">
                        <thead>
                            <th style="border: 1px solid black"><b class="title">Позиция</b></th>
                            <th style="border: 1px solid black"><b class="title">Никнейм</b></th>
                            <th style="border: 1px solid black"><b class="title">Очки</b></th>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
`;

export default leaderboard;